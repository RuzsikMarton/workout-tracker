import { prisma } from "../prisma";

export async function getActiveWorkout(userId: string) {
  const activeWorkout = await prisma.workout.findFirst({
    where: {
      userId: userId,
      status: "IN_PROGRESS",
    },
    include: {
      workoutExercises: {
        select: {
          exerciseId: true,
          sets: true,
        },
      },
    },
  });

  return activeWorkout;
}

export async function getActiveWorkoutWithData(userId: string) {
  const activeWorkout = await prisma.workout.findFirst({
    where: {
      userId: userId,
      status: "IN_PROGRESS",
    },
    include: {
      workoutExercises: {
        include: {
          exercise: true,
          sets: {
            orderBy: {
              setNumber: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return activeWorkout;
}

export async function getWorkoutById(workoutId: string) {}

export async function getWorkoutHistory({
  userId,
  page,
  pageSize,
}: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  const totalCount = await prisma.workout.count({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
  });
  const workoutHistory = await prisma.workout.findMany({
    where: {
      userId: userId,
      status: "COMPLETED",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return { workoutHistory, totalCount };
}
