import PageTitle from "@/components/PageTitle";
import ActiveWorkoutClient from "@/components/workouts/activeworkout/ActiveWorkoutClient";
import { auth } from "@/lib/auth";
import { getExercisesSheet } from "@/lib/data/get-exercise";
import { getActiveWorkoutWithData } from "@/lib/data/get-workout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ActiveWorkoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ equipment: string; muscle: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const activeWorkout = await getActiveWorkoutWithData(session.user.id);

  if (!activeWorkout) {
    redirect("/workouts");
  }

  const sheetExercises = await getExercisesSheet();
  return (
    <div className="page-main app-layout">
      <div className="w-full">
        <PageTitle title="Workout log" />
        <ActiveWorkoutClient
          activeWorkout={activeWorkout}
          sheetExercises={sheetExercises}
        />
      </div>
    </div>
  );
};

export default ActiveWorkoutPage;
