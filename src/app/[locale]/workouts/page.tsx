import PageTitle from "@/components/PageTitle";
import ActiveWorkoutCard from "@/components/workouts/ActiveWorkoutCard";
import WorkoutHistory from "@/components/workouts/WorkoutHistory";
import { auth } from "@/lib/auth";
import { getActiveWorkout, getWorkoutHistory } from "@/lib/data/get-workout";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const workoutHistorydev = [
  {
    id: "1",
    userId: "1",
    status: "COMPLETED",
    description: null,
    duration: 2700,
    title: "Evening Workout - Strength and Conditioning",
    workoutExercises: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    status: "COMPLETED",
    description: null,
    duration: 1800,
    title: "Lunchtime Quick Cardio Blast",
    workoutExercises: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("workouts"),
  };
}
export default async function Workouts({
  searchParams,
}: {
  searchParams: Promise<{ page: string; pageSize: string }>;
}) {
  const t = await getTranslations("workoutsTitle");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const page = parseInt((await searchParams).page || "1");
  const pageSize = parseInt((await searchParams).pageSize || "10");

  const activeWorkout = await getActiveWorkout(session.user.id);
  const { workoutHistory, totalCount } = await getWorkoutHistory({
    userId: session.user.id,
    page: page,
    pageSize: pageSize,
  });

  return (
    <main className="page-main app-layout">
      <div className="w-full">
        <PageTitle title={t("title")} />
        <div className="page-container">
          <ActiveWorkoutCard activeWorkout={activeWorkout} />
          <WorkoutHistory
            workoutHistory={workoutHistory}
            totalCount={totalCount}
            page={page}
            pageSize={pageSize}
          />
        </div>
      </div>
    </main>
  );
}
