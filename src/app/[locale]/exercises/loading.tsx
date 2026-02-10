import ExerciseSkeleton from "@/components/exercises/ExerciseSkeleton";
import ExerciseFilter from "@/components/exercises/ExerciseFilter";
import PageTitle from "@/components/PageTitle";

const Loading = () => {
  return (
    <main className="page-main pt-28 dark:bg-secondary">
      <div className="w-full">
        <PageTitle title="Loading exercises..." />
        <ExerciseFilter disabled />
        <ExerciseSkeleton />
      </div>
    </main>
  );
};

export default Loading;
