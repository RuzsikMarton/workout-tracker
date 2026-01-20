import AddExerciseForm from "@/components/exercises/AddExerciseForm";
import { requireRole } from "@/lib/user-role";

const NewExercisePage = async () => {
  await requireRole("ADMIN");
  return (
    <main className="page-main dark:bg-secondary">
      <div className="flex justify-center items-center grow p-4 sm:p-8">
        <AddExerciseForm />
      </div>
    </main>
  );
};

export default NewExercisePage;
