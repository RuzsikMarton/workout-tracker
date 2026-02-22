"use server";

import { requireSession } from "../auth-helpers";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type ExerciseSetActionResult =
  | { ok: true; setId?: string }
  | { ok: false; code: string };

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
    // Verify ownership
    const existingSet = await prisma.exerciseSet.findFirst({
      where: {
        id: setId,
        workoutExercise: {
          workout: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!existingSet) {
      return {
        ok: false,
        code: "SET_NOT_FOUND",
      };
    }

    await prisma.exerciseSet.update({
      where: { id: setId },
      data,
    });

    revalidatePath("/workouts/active");
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
    const existingSet = await prisma.exerciseSet.findFirst({
      where: {
        id: setId,
        workoutExercise: {
          workout: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!existingSet) {
      return {
        ok: false,
        code: "SET_NOT_FOUND",
      };
    }

    await prisma.exerciseSet.update({
      where: { id: setId },
      data: {
        completed: !existingSet.completed,
      },
    });

    revalidatePath("/workouts/active");
    return { ok: true };
  } catch (error) {
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
    const existingSet = await prisma.exerciseSet.findFirst({
      where: {
        id: setId,
        workoutExercise: {
          workout: {
            userId: session.user.id,
          },
        },
      },
      select: { id: true, workoutExerciseId: true },
    });

    if (!existingSet) {
      return {
        ok: false,
        code: "SET_NOT_FOUND",
      };
    }

    await prisma.$transaction(async (tx) => {
      await prisma.exerciseSet.delete({
        where: { id: setId },
      });

      const remaining = await prisma.exerciseSet.findMany({
        where: { workoutExerciseId: existingSet.workoutExerciseId },
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
    });

    revalidatePath("/workouts/active");
    return { ok: true };
  } catch (error) {
    console.error("Error deleting exercise set:", error);
    return {
      ok: false,
      code: "FAILED_TO_DELETE_EXERCISE_SET",
    };
  }
}
