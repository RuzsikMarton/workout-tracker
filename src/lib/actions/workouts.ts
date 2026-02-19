"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type WorkoutActionResult =
  | { ok: true; workoutId: string }
  | { ok: false; message: string };

export async function createWorkoutAction(): Promise<WorkoutActionResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { ok: false, message: "User not authenticated" };
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
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create workout. Please try again.";
    return { ok: false, message: errorMessage };
  }
}

export async function createWorkoutExerciseAction(
  exerciseIds: string[],
): Promise<WorkoutActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { ok: false, message: "User not authenticated" };
  }

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
    return { ok: false, message: "Workout not found or not in progress" };
  }

  const startOrder = workout.workoutExercises[0]?.order ?? 0;

  try {
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
    return {
      ok: false,
      message: "Failed to add exercises to workout. Please try again.",
    };
  }
}
