import ExercisePageCard from "@/components/exercises/exercisepage/ExercisePageCard";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getExercise } from "@/lib/data/get-exercise";
import UserExerciseStats from "@/components/exercises/exercisepage/UserExerciseStats";

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

const ExercisePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const data = await getExercise({ slug });
  if (!data) {
    notFound();
  }
  return (
    <main className="min-h-screen font-sans app-layout">
      <ExercisePageCard exercise={data.exercise} />
      <UserExerciseStats stats={data.userStats} />
    </main>
  );
};

export default ExercisePage;
