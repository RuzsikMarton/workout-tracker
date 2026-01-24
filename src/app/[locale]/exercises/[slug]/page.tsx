import ExercisePageCard from "@/components/exercises/ExercisePageCard";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const ExercisePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const exercise = await prisma.exercise.findUnique({
    where: { name: slug.toLocaleLowerCase().trim() },
  });
  if (!exercise) {
    notFound();
  }
  return (
    <main className="min-h-screen font-sans pt-28 dark:bg-secondary">
      <ExercisePageCard {...exercise} />
    </main>
  );
};

export default ExercisePage;
