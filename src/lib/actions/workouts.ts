"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { requireSession } from "../auth-helpers";

type WorkoutActionResult =
  | { ok: true; workoutId?: string }
  | { ok: false; code: string };

export async function createWorkoutAction(): Promise<WorkoutActionResult> {
  try {
    const session = await requireSession();
    if (!session) {
      return { ok: false, code: "NOT_AUTHENTICATED" };
    }

    const workout = await prisma.workout.create({
      data: {
        title: Date.now().toString(),
        userId: session.user.id,
      },
    });

    revalidatePath("/workouts");
    return { ok: true, workoutId: workout.id };
  } catch (error: unknown) {
    console.error("Error creating workout:", error);
    return {
      ok: false,
      code: "FAILED_TO_CREATE_WORKOUT",
    };
  }
}

//WORKOUT DELETE ACTION
export async function deleteWorkoutAction(
  workoutId: string,
): Promise<WorkoutActionResult> {
  const session = await requireSession();

  if (!session) {
    return { ok: false, code: "NOT_AUTHENTICATED" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const workout = await tx.workout.findFirst({
        where: {
          id: workoutId,
          userId: session.user.id,
        },
        include: {
          workoutExercises: true,
        },
      });
      if (!workout) throw new Error("WORKOUT_NOT_FOUND");

      // find ids of exercises that are being deleted with the workout
      const deletedExerciseIds = [
        ...new Set(workout.workoutExercises.map((we) => we.exerciseId)),
      ];

      const deletedWorkoutExerciseIds = new Set(
        workout.workoutExercises.map((we) => we.id),
      );
      //get user stats for the exercises being deleted
      const userStats = await tx.userExerciseStats.findMany({
        where: {
          userId: session.user.id,
          exerciseId: { in: deletedExerciseIds },
        },
      });

      const statsMap = new Map(
        userStats.map((stat) => [stat.exerciseId, stat]),
      );

      // determine which exercises need to have their stats updated after deletion
      const exercisesToUpdate = new Set<string>();
      for (const exerciseId of deletedExerciseIds) {
        const stats = statsMap.get(exerciseId);
        if (!stats) continue;
        if (
          (stats.lastWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.lastWorkoutExerciseId)) ||
          (stats.heaviestSetWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(
              stats.heaviestSetWorkoutExerciseId,
            )) ||
          (stats.bestVolumeWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.bestVolumeWorkoutExerciseId)) ||
          (stats.bestE1RMWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.bestE1RMWorkoutExerciseId))
        ) {
          exercisesToUpdate.add(exerciseId);
        }
      }

      await tx.workout.delete({
        where: {
          id: workoutId,
        },
      });

      //recompute stats for affected exercises
      for (const exerciseId of exercisesToUpdate) {
        const remainingWorkoutExercises = await tx.workoutExercise.findMany({
          where: {
            exerciseId,
            workout: {
              userId: session.user.id,
              status: "COMPLETED",
            },
          },
          include: {
            sets: true,
            workout: {
              select: {
                createdAt: true,
              },
            },
          },
        });

        if (remainingWorkoutExercises.length === 0) {
          await tx.userExerciseStats.delete({
            where: {
              userId_exerciseId: {
                userId: session.user.id,
                exerciseId,
              },
            },
          });
          continue;
        }

        let lastPerformed: Date | null = null;
        let lastWorkoutExerciseId: string | null = null;
        let bestSetWeight: number | null = null;
        let bestSetReps: number | null = null;
        let bestE1RM: number | null = null;
        let bestVolume: number | null = null;
        let heaviestSetWorkoutExerciseId: string | null = null;
        let bestE1RMWorkoutExerciseId: string | null = null;
        let bestVolumeWorkoutExerciseId: string | null = null;

        for (const exercise of remainingWorkoutExercises) {
          const workoutDate = exercise.workout.createdAt;
          if (!lastPerformed || workoutDate > lastPerformed) {
            lastPerformed = workoutDate;
            lastWorkoutExerciseId = exercise.id;
          }
          for (const set of exercise.sets) {
            const reps = set.reps ?? 0;
            const weight = set.weight ?? 0;
            const volume = reps * weight;

            if (
              bestSetWeight === null ||
              weight > bestSetWeight ||
              (weight === bestSetWeight && reps > (bestSetReps ?? 0))
            ) {
              bestSetWeight = weight;
              bestSetReps = reps;
              heaviestSetWorkoutExerciseId = exercise.id;
            }
            if (bestVolume === null || volume > bestVolume) {
              bestVolume = volume;
              bestVolumeWorkoutExerciseId = exercise.id;
            }
            if (weight > 0 && reps > 0) {
              const e1RM = weight * (1 + reps / 30);
              if (bestE1RM === null || e1RM > bestE1RM) {
                bestE1RM = e1RM;
                bestE1RMWorkoutExerciseId = exercise.id;
              }
            }
          }
        }

        // upsert the recomputed stats
        await tx.userExerciseStats.upsert({
          where: {
            userId_exerciseId: {
              userId: session.user.id,
              exerciseId,
            },
          },
          update: {
            lastPerformed,
            lastWorkoutExerciseId,
            bestSetWeight,
            bestSetReps,
            heaviestSetWorkoutExerciseId,
            bestE1RM,
            bestE1RMWorkoutExerciseId,
            bestVolume,
            bestVolumeWorkoutExerciseId,
          },
          create: {
            userId: session.user.id,
            exerciseId,
            lastPerformed,
            lastWorkoutExerciseId,
            bestSetWeight,
            bestSetReps,
            heaviestSetWorkoutExerciseId,
            bestE1RM,
            bestE1RMWorkoutExerciseId,
            bestVolume,
            bestVolumeWorkoutExerciseId,
          },
        });
      }
    });

    revalidatePath("/workouts");
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "WORKOUT_NOT_FOUND") {
      return { ok: false, code: "WORKOUT_NOT_FOUND" };
    }

    console.error("Error deleting workout:", error);
    return {
      ok: false,
      code: "FAILED_TO_DELETE_WORKOUT",
    };
  }
}

export async function updateWorkoutTitleAction(
  workoutId: string,
  title: string,
): Promise<WorkoutActionResult> {
  const session = await requireSession();

  if (!session) {
    return { ok: false, code: "NOT_AUTHENTICATED" };
  }
  try {
    const res = await prisma.workout.updateMany({
      where: {
        id: workoutId,
        userId: session.user.id,
        status: "IN_PROGRESS",
      },
      data: {
        title: title.trim(),
      },
    });

    if (res.count === 0) return { ok: false, code: "WORKOUT_NOT_FOUND" };

    revalidatePath("/workouts");
    revalidatePath("/workouts/active");
    return { ok: true };
  } catch (error: unknown) {
    console.error("Error updating workout title:", error);
    return {
      ok: false,
      code: "FAILED_TO_UPDATE_WORKOUT_TITLE",
    };
  }
}

export async function finishWorkoutAction(
  workoutId: string,
): Promise<WorkoutActionResult> {
  try {
    const session = await requireSession();

    if (!session) {
      return { ok: false, code: "NOT_AUTHENTICATED" };
    }

    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId: session.user.id,
        status: "IN_PROGRESS",
      },
      include: {
        workoutExercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    if (!workout) return { ok: false, code: "WORKOUT_NOT_FOUND" };

    // calculate total volume and duration
    const totalVolume = workout?.workoutExercises.reduce(
      (workoutTotal, exercise) =>
        workoutTotal +
        exercise.sets?.reduce(
          (exerciseTotal, set) => exerciseTotal + set.reps * set.weight,
          0,
        ),
      0,
    );

    const duration = Math.floor(
      (Date.now() - workout.createdAt.getTime()) / 1000,
    );

    // fetch existing user exercise stats for all exercises in the workout
    const exerciseIds = [
      ...new Set(workout.workoutExercises.map((we) => we.exerciseId)),
    ];

    // fetch existing stats for these exercises for the user
    const existingUserExerciseStats = await prisma.userExerciseStats.findMany({
      where: {
        userId: session.user.id,
        exerciseId: { in: exerciseIds },
      },
    });

    // create a map of existing stats for easy lookup
    const existingStatsMap = new Map(
      existingUserExerciseStats.map((stat) => [stat.exerciseId, stat]),
    );

    await prisma.$transaction(async (tx) => {
      await prisma.workout.update({
        where: { id: workoutId },
        data: {
          status: "COMPLETED",
          duration,
          totalVolume,
        },
      });

      for (const exercise of workout.workoutExercises) {
        let sessionVolume = 0;
        let topSetWeight: number | null = null;
        let topSetReps: number | null = null;
        let topE1RM: number | null = null;

        for (const set of exercise.sets) {
          const reps = set.reps ?? 0;
          const weight = set.weight ?? 0;
          sessionVolume += reps * weight;

          if (
            topSetWeight === null ||
            weight > topSetWeight ||
            (weight === topSetWeight && reps > (topSetReps ?? 0))
          ) {
            // new top set found
            topSetWeight = weight;
            topSetReps = reps;
          }

          if (weight > 0 && reps > 0) {
            const e1RM = weight * (1 + reps / 30); // Epley formula for 1RM estimation
            if (topE1RM === null || e1RM > topE1RM) {
              topE1RM = e1RM;
            }
          }
        }
        // merging new workout stats with existing stats
        const existingStats = existingStatsMap.get(exercise.exerciseId);
        const shouldUpdate =
          topSetWeight !== null &&
          (!existingStats ||
            existingStats.bestSetWeight === null ||
            topSetWeight > existingStats.bestSetWeight ||
            (topSetWeight === existingStats.bestSetWeight &&
              (topSetReps ?? 0) > (existingStats.bestSetReps ?? 0)));

        const merged = {
          lastPerformed: workout.createdAt,
          lastWorkoutExerciseId: exercise.id,
          bestSetWeight: shouldUpdate
            ? topSetWeight
            : existingStats?.bestSetWeight || null,
          bestSetReps: shouldUpdate
            ? topSetReps
            : existingStats?.bestSetReps || null,
          heaviestSetWorkoutExerciseId: shouldUpdate
            ? exercise.id
            : existingStats?.heaviestSetWorkoutExerciseId || null,
          bestE1RM:
            topE1RM !== null &&
            (!existingStats ||
              existingStats.bestE1RM === null ||
              topE1RM > existingStats.bestE1RM)
              ? topE1RM
              : (existingStats?.bestE1RM ?? null),
          bestE1RMWorkoutExerciseId:
            topE1RM !== null &&
            (!existingStats ||
              existingStats.bestE1RM === null ||
              topE1RM > existingStats.bestE1RM)
              ? exercise.id
              : existingStats?.bestE1RMWorkoutExerciseId || null,
          bestVolume:
            !existingStats ||
            existingStats.bestVolume == null ||
            sessionVolume > existingStats.bestVolume
              ? sessionVolume
              : existingStats.bestVolume,
          bestVolumeWorkoutExerciseId:
            !existingStats ||
            existingStats.bestVolume == null ||
            sessionVolume > existingStats.bestVolume
              ? exercise.id
              : existingStats?.bestVolumeWorkoutExerciseId || null,
        };

        await tx.userExerciseStats.upsert({
          where: {
            userId_exerciseId: {
              userId: session.user.id,
              exerciseId: exercise.exerciseId,
            },
          },
          update: merged,
          create: {
            userId: session.user.id,
            exerciseId: exercise.exerciseId,
            ...merged,
          },
        });
      }
    });

    revalidatePath("/workouts");
    revalidatePath("/workouts/active");
    return { ok: true };
  } catch (error: unknown) {
    console.error("Error finishing workout:", error);
    return {
      ok: false,
      code: "FAILED_TO_COMPLETE_WORKOUT",
    };
  }
}

export async function createWorkoutExerciseAction(
  exerciseIds: string[],
): Promise<WorkoutActionResult> {
  const session = await requireSession();

  if (!session) {
    return { ok: false, code: "NOT_AUTHENTICATED" };
  }

  try {
    const workout = await prisma.workout.findFirst({
      where: {
        userId: session.user.id,
        status: "IN_PROGRESS",
      },
      include: {
        workoutExercises: {
          select: { order: true },
          orderBy: { order: "desc" },
          take: 1,
        },
      },
    });

    if (!workout) {
      return { ok: false, code: "WORKOUT_NOT_FOUND" };
    }
    const startOrder = workout.workoutExercises[0]?.order ?? 0;

    await prisma.workoutExercise.createMany({
      data: exerciseIds.map((exerciseId, index) => ({
        workoutId: workout.id,
        exerciseId: exerciseId,
        order: startOrder + index + 1,
      })),
    });
    revalidatePath("/workouts/active");
    return { ok: true, workoutId: workout.id };
  } catch (error) {
    console.error("Error adding exercises to workout:", error);
    return {
      ok: false,
      code: "FAILED_TO_ADD_EXERCISES_TO_WORKOUT",
    };
  }
}

export async function removeWorkoutExerciseAction(
  exerciseId: string,
): Promise<WorkoutActionResult> {
  const session = await requireSession();

  if (!session) {
    return { ok: false, code: "NOT_AUTHENTICATED" };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await prisma.workoutExercise.deleteMany({
        where: {
          id: exerciseId,
          workout: {
            userId: session.user.id,
          },
        },
      });

      const remaining = await prisma.workoutExercise.findMany({
        where: {
          workoutId: exerciseId,
        },
        orderBy: { order: "asc" },
        select: { id: true },
      });

      await Promise.all(
        remaining.map((exercise, index) =>
          tx.workoutExercise.update({
            where: { id: exercise.id },
            data: { order: index + 1 },
          }),
        ),
      );
    });
    revalidatePath("/workouts/active");
    return { ok: true };
  } catch (error) {
    console.error("Error removing exercise from workout:", error);
    return {
      ok: false,
      code: "FAILED_TO_REMOVE_EXERCISE_FROM_WORKOUT",
    };
  }
}
