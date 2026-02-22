import ExercisePageCard from "@/components/exercises/exercisepage/ExercisePageCard";
import { notFound } from "next/navigation";
import ExerciseSessionStatCard from "@/components/exercises/exercisepage/ExerciseSessionStatCard";
import { getTranslations } from "next-intl/server";
import { getExercise } from "@/lib/data/get-exercise";

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

  const exercise = await getExercise({ slug });
  if (!exercise) {
    notFound();
  }
  return (
    <main className="min-h-screen font-sans app-layout">
      <ExercisePageCard {...exercise} />
      {/* will need to implement personal best and last session data for exercises
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16 py-6">
        <ExerciseSessionStatCard
          key={"personal-best"}
          type="PersonalBestCard"
        />
        <ExerciseSessionStatCard
          key={"last-exercise"}
          type="LastExerciseCard"
        />
      </div>*/}
    </main>
  );
};

export default ExercisePage;
