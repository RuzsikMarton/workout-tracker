import { prisma } from "../prisma";

export async function getUserProfile(userId: string) {
  const now = new Date();
  const twentyEightDaysAgo = new Date();
  twentyEightDaysAgo.setDate(now.getDate() - 28);

  const [totalWorkouts, last28] = await Promise.all([
    prisma.workout.count({
      where: { userId, status: "COMPLETED" },
    }),
    prisma.workout.findMany({
      where: {
        userId: userId,
        status: "COMPLETED",
        createdAt: {
          gte: twentyEightDaysAgo,
          lte: now,
        },
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        createdAt: true,
        totalVolume: true,
        duration: true,
        _count: {
          select: {
            workoutExercises: true,
          },
        },
      },
    }),
  ]);
  const last28WorkoutCount = last28.length;
  return { totalWorkouts, last28, last28WorkoutCount };
}
