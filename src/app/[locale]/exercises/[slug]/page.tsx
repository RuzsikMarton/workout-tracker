import ExercisePageCard from "@/components/exercises/exercisepage/ExercisePageCard";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ExerciseSessionStatCard from "@/components/exercises/exercisepage/ExerciseSessionStatCard";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const slug = (await params).slug;
  const t = await getTranslations({
    locale,
    namespace: slug.toLocaleLowerCase().trim(),
  });

  const title = "WT | " + t("name");

  return {
    title,
  };
}

const exerciseSets = [
  {
    id: "1",
    setNumber: 1,
    reps: 10,
    weight: 100,
    workoutExerciseId: "we1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    setNumber: 2,
    reps: 8,
    weight: 120,
    workoutExerciseId: "we1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    setNumber: 3,
    reps: 6,
    weight: 140,
    workoutExerciseId: "we1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16 py-6">
        <ExerciseSessionStatCard
          key={"personal-best"}
          type="PersonalBestCard"
          workoutExercise={exerciseSets}
        />
        <ExerciseSessionStatCard
          key={"last-exercise"}
          type="LastExerciseCard"
          workoutExercise={exerciseSets}
        />
      </div>
    </main>
  );
};

export default ExercisePage;
