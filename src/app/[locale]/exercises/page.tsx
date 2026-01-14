import ExercisesClient from "@/components/exercises/ExercisesClient";

export default function Exercises() {
  const initial = { items: [], page: 1, totalPages: 1 };
  return (
    <main className="page-main pt-28 dark:bg-secondary">
      <ExercisesClient initial={initial} />
    </main>
  );
}
