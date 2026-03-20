import WorkoutEditorClient from "@/components/workouts/workouteditor/WorkoutEditorClient";
import { requireSessionOrRedirect } from "@/lib/auth-helpers";
import { getExercisesSheet } from "@/lib/data/get-exercise";
import { getUserWorkoutById } from "@/lib/data/get-workout";
import { redirect } from "next/navigation";

const EditWorkoutPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await requireSessionOrRedirect();
  const { slug } = await params;

  const data = await getUserWorkoutById(slug, session.user.id);
  if (!data) return redirect(`/workouts/${slug}`);
  const sheetExercises = await getExercisesSheet();

  return (
    <div className="page-main app-layout">
      <div className="w-full">
        <WorkoutEditorClient sheetExercises={sheetExercises} workout={data} />
      </div>
    </div>
  );
};

export default EditWorkoutPage;
