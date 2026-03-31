import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function getExercise(params: { slug: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const slug = params.slug.trim();
  const exercise = await prisma.exercise.findUnique({
    where: { name: slug },
  });

  if (!exercise) {
    return null;
  }

  let userStats = null;
  if (session) {
    userStats = await prisma.userExerciseStats.findUnique({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId: exercise.id,
        },
      },
    });
  }

  let bestWorkoutExercise = null;
  let lastWorkoutExercise = null;
  if (userStats) {
    const lastId = userStats.lastWorkoutExerciseId;
    const bestId = userStats.heaviestSetWorkoutExerciseId;
    if (lastId && bestId && lastId === bestId) {
      const workoutExercise = await prisma.workoutExercise.findUnique({
        where: { id: lastId },
        include: {
          sets: {
            orderBy: { setNumber: "asc" },
          },
        },
      });
      bestWorkoutExercise = workoutExercise;
      lastWorkoutExercise = workoutExercise;
    } else {
      if (lastId) {
        lastWorkoutExercise = await prisma.workoutExercise.findUnique({
          where: { id: lastId },
          include: {
            sets: {
              orderBy: { setNumber: "asc" },
            },
          },
        });
      }
      if (bestId) {
        bestWorkoutExercise = await prisma.workoutExercise.findUnique({
          where: { id: bestId },
          include: {
            sets: {
              orderBy: { setNumber: "asc" },
            },
          },
        });
      }
    }
  }

  return {
    exercise,
    userStats,
    isAuthenticated: !!session,
    bestWorkoutExercise,
    lastWorkoutExercise,
  };
}

export async function getExercises(params: {
  equipment: string;
  muscle: string;
  sort: string;
  page: number;
  pageSize: number;
}) {
  const equipment = (params.equipment ?? "").trim();
  const muscle = (params.muscle ?? "").trim();
  const sort = params.sort === "desc" ? "desc" : "asc";

  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number(params.pageSize ?? 10) || 10),
  );
  const skip = (page - 1) * pageSize;

  const where: Prisma.ExerciseWhereInput = {};
  if (equipment) where.equipment = { has: equipment };
  if (muscle) where.muscleGroup = { has: muscle };

  const [totalCount, exercises] = await Promise.all([
    prisma.exercise.count({ where }),
    prisma.exercise.findMany({
      where,
      orderBy: { name: sort },
      skip,
      take: pageSize,
    }),
  ]);

  return {
    exercises,
    pagination: {
      total: totalCount,
      page,
      pageSize,
    },
  };
}

export async function getExercisesSheet() {
  const exercises = await prisma.exercise.findMany({});

  return exercises;
}

export async function getExercisesFiltered(params: {
  equipment?: string;
  muscle?: string;
}) {
  const equipment = (params.equipment ?? "").trim();
  const muscle = (params.muscle ?? "").trim();

  const where: Prisma.ExerciseWhereInput = {};
  if (equipment) where.equipment = { has: equipment };
  if (muscle) where.muscleGroup = { has: muscle };

  const exercises = await prisma.exercise.findMany({
    where,
  });

  return exercises;
}
