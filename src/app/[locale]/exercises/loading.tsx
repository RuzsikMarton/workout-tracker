import ExerciseSkeleton from "@/components/exercises/ExerciseSkeleton";
import ExerciseFilter from "@/components/exercises/ExerciseFilter";
import PageTitle from "@/components/PageTitle";
import { ExercisesContainer } from "@/components/exercises/ExercisesContainer";
import { getTranslations } from "next-intl/server";

const Loading = async () => {
  const t = await getTranslations("ExercisesPage");
  return (
    <main className="page-main pt-28 dark:bg-secondary">
      <div className="w-full">
        <PageTitle title={t("loading")} />
        <ExercisesContainer>
          <ExerciseFilter disabled />
        </ExercisesContainer>
        <ExerciseSkeleton />
      </div>
    </main>
  );
};

export default Loading;
