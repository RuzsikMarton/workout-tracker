"use server";

import { Prisma } from "@prisma/client";
import { requireSession } from "../auth-helpers";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type ExerciseSetActionResult =
  | { ok: true; setId?: string }
  | { ok: false; code: string };

const recomputeStatsforExercise = async (
  tx: Prisma.TransactionClient,
  userId: string,
  exerciseId: string,
) => {
  const remainingWorkoutExercises = await tx.workoutExercise.findMany({
    where: {
      exerciseId,
      workout: {
        userId,
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

  if (
    remainingWorkoutExercises.length === 0 ||
    remainingWorkoutExercises.every((we) => we.sets.length === 0)
  ) {
    await tx.userExerciseStats.deleteMany({
      where: {
        userId,
        exerciseId,
      },
    });
    return;
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

  await tx.userExerciseStats.upsert({
    where: {
      userId_exerciseId: {
        userId,
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
      userId,
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
};

export async function createExerciseSetAction(
  exerciseId: string,
): Promise<ExerciseSetActionResult> {
  const session = await requireSession();
  if (!session) return { ok: false, code: "NOT_AUTHENTICATED" };

  try {
    const exercise = await prisma.workoutExercise.findFirst({
      where: {
        id: exerciseId,
        workout: { userId: session.user.id },
      },
      include: {
        sets: {
          select: {
            setNumber: true,
          },
          orderBy: {
            setNumber: "desc",
          },
          take: 1,
        },
      },
    });
    if (!exercise) {
      return {
        ok: false,
        code: "EXERCISE_NOT_FOUND",
      };
    }

    const lastSetNumber = exercise.sets[0]?.setNumber ?? 0;
    const newSet = await prisma.exerciseSet.create({
      data: {
        workoutExerciseId: exerciseId,
        setNumber: lastSetNumber + 1,
        reps: 0,
        weight: 0,
      },
    });

    revalidatePath("/workouts/active");
    return {
      ok: true,
      setId: newSet.id,
    };
  } catch (error) {
    console.error("Error creating exercise set:", error);
    return {
      ok: false,
      code: "FAILED_TO_CREATE_EXERCISE_SET",
    };
  }
}

export async function updateExerciseSetAction(
  setId: string,
  data: { reps?: number; weight?: number },
): Promise<ExerciseSetActionResult> {
  const session = await requireSession();
  if (!session) return { ok: false, code: "NOT_AUTHENTICATED" };

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Verify ownership
      const existingSet = await tx.exerciseSet.findFirst({
        where: {
          id: setId,
          workoutExercise: {
            workout: {
              userId: session.user.id,
            },
          },
        },
        select: {
          id: true,
          workoutExercise: {
            select: {
              id: true,
              exerciseId: true,
              workout: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!existingSet) {
        throw new Error("SET_NOT_FOUND");
      }

      const workoutId = existingSet.workoutExercise.workout.id;
      const workoutStatus = existingSet.workoutExercise.workout.status;

      await tx.exerciseSet.update({
        where: { id: setId },
        data,
      });

      if (existingSet.workoutExercise.workout.status === "COMPLETED") {
        await recomputeStatsforExercise(
          tx,
          session.user.id,
          existingSet.workoutExercise.exerciseId,
        );
      }
      return {
        workoutStatus,
        workoutId,
      };
    });

    revalidatePath("/workouts");

    if (result.workoutStatus === "IN_PROGRESS") {
      revalidatePath("/workouts/active");
    } else {
      revalidatePath(`/workouts/${result.workoutId}`);
      revalidatePath(`/workouts/${result.workoutId}/edit`);
    }
    return { ok: true };
  } catch (error) {
    console.error("Error updating exercise set:", error);
    return {
      ok: false,
      code: "FAILED_TO_UPDATE_EXERCISE_SET",
    };
  }
}

export async function toggleSetCompletedAction(
  setId: string,
): Promise<ExerciseSetActionResult> {
  const session = await requireSession();
  if (!session) return { ok: false, code: "NOT_AUTHENTICATED" };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingSet = await tx.exerciseSet.findFirst({
        where: {
          id: setId,
          workoutExercise: {
            workout: {
              userId: session.user.id,
            },
          },
        },
        select: {
          id: true,
          completed: true,
          workoutExercise: {
            select: {
              id: true,
              exerciseId: true,
              workout: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!existingSet) {
        throw new Error("SET_NOT_FOUND");
      }

      const workoutId = existingSet.workoutExercise.workout.id;
      const workoutStatus = existingSet.workoutExercise.workout.status;

      await tx.exerciseSet.update({
        where: { id: setId },
        data: {
          completed: !existingSet.completed,
        },
      });

      if (existingSet.workoutExercise.workout.status === "COMPLETED") {
        await recomputeStatsforExercise(
          tx,
          session.user.id,
          existingSet.workoutExercise.exerciseId,
        );
      }

      return {
        workoutStatus,
        workoutId,
      };
    });

    revalidatePath("/workouts");

    if (result.workoutStatus === "IN_PROGRESS") {
      revalidatePath("/workouts/active");
    } else {
      revalidatePath(`/workouts/${result.workoutId}`);
      revalidatePath(`/workouts/${result.workoutId}/edit`);
    }
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "SET_NOT_FOUND") {
      return { ok: false, code: "SET_NOT_FOUND" };
    }
    console.error("Error toggling exercise set completion:", error);
    return {
      ok: false,
      code: "FAILED_TO_UPDATE_EXERCISE_SET",
    };
  }
}

export async function deleteExerciseSetAction(
  setId: string,
): Promise<ExerciseSetActionResult> {
  const session = await requireSession();
  if (!session) return { ok: false, code: "NOT_AUTHENTICATED" };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingSet = await tx.exerciseSet.findFirst({
        where: {
          id: setId,
          workoutExercise: {
            workout: {
              userId: session.user.id,
            },
          },
        },
        select: {
          id: true,
          workoutExercise: {
            select: {
              id: true,
              exerciseId: true,
              workout: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!existingSet) {
        throw new Error("SET_NOT_FOUND");
      }

      const workoutId = existingSet.workoutExercise.workout.id;
      const workoutStatus = existingSet.workoutExercise.workout.status;

      await tx.exerciseSet.delete({
        where: { id: setId },
      });

      const remaining = await tx.exerciseSet.findMany({
        where: { workoutExerciseId: existingSet.workoutExercise.id },
        orderBy: { setNumber: "asc" },
        select: { id: true },
      });

      await Promise.all(
        remaining.map((set, index) =>
          tx.exerciseSet.update({
            where: { id: set.id },
            data: { setNumber: index + 1 },
          }),
        ),
      );

      if (existingSet.workoutExercise.workout.status === "COMPLETED") {
        await recomputeStatsforExercise(
          tx,
          session.user.id,
          existingSet.workoutExercise.exerciseId,
        );
      }
      return {
        workoutStatus,
        workoutId,
      };
    });

    revalidatePath("/workouts");

    if (result.workoutStatus === "IN_PROGRESS") {
      revalidatePath("/workouts/active");
    } else {
      revalidatePath(`/workouts/${result.workoutId}`);
      revalidatePath(`/workouts/${result.workoutId}/edit`);
    }
    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "SET_NOT_FOUND") {
      return { ok: false, code: "SET_NOT_FOUND" };
    }
    console.error("Error deleting exercise set:", error);
    return {
      ok: false,
      code: "FAILED_TO_DELETE_EXERCISE_SET",
    };
  }
}
