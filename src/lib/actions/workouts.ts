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
    });

    if (!workout) return { ok: false, code: "WORKOUT_NOT_FOUND" };

    const duration = Math.floor(
      (Date.now() - workout.createdAt.getTime()) / 1000,
    );

    await prisma.workout.update({
      where: { id: workoutId },
      data: {
        status: "COMPLETED",
        duration,
      },
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
