import AddExerciseForm from "@/components/admin/AddExerciseForm";
import { requireRole } from "@/lib/user-role";

const NewExercisePage = async () => {
  await requireRole("ADMIN");
  return (
    <main className="page-main app-layout">
      <div className="flex justify-center items-center grow">
        <AddExerciseForm />
      </div>
    </main>
  );
};

export default NewExercisePage;
