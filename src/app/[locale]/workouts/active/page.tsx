import PageTitle from "@/components/PageTitle";
import ActiveWorkoutClient from "@/components/workouts/activeworkout/ActiveWorkoutClient";
import { auth } from "@/lib/auth";
import { getExercisesSheet } from "@/lib/data/get-exercise";
import { getActiveWorkoutWithData } from "@/lib/data/get-workout";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ActiveWorkoutPage = async () => {
  const t = await getTranslations("workoutLog");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const data = await getActiveWorkoutWithData(session.user.id);

  if (!data) {
    redirect("/workouts");
  }

  const sheetExercises = await getExercisesSheet();
  return (
    <div className="page-main app-layout">
      <div className="w-full">
        <PageTitle title={t("title")} />
        <ActiveWorkoutClient
          activeWorkout={data.activeWorkout}
          totalVolume={data.totalVolume}
          sheetExercises={sheetExercises}
        />
      </div>
    </div>
  );
};

export default ActiveWorkoutPage;
