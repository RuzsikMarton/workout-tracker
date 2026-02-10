import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function getExercise(params: { slug: string }) {
  const slug = params.slug.trim();
  const exercise = await prisma.exercise.findUnique({
    where: { name: slug },
  });
  return exercise;
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
