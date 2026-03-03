import PageTitle from "@/components/PageTitle";
import WorkoutDetailsHeader from "@/components/workouts/workoutdetails/WorkoutDetailsHeader";
import { requireSessionOrRedirect } from "@/lib/auth-helpers";
import { getUserWorkoutById } from "@/lib/data/get-workout";
import { redirect } from "next/navigation";

const SingleWorkoutPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await requireSessionOrRedirect();
  const { slug } = await params;
  const workout = await getUserWorkoutById(slug, session.user.id);
  if (!workout) redirect("/workouts");
  return (
    <main className="page-main app-layout">
      <div className="w-full">
        <PageTitle title={workout.title} date={workout.createdAt} />
        <WorkoutDetailsHeader
          duration={workout.duration}
          volume={workout.totalVolume}
          sets={workout.workoutExercises.reduce(
            (acc, we) => acc + we.sets.length,
            0,
          )}
        />
        <div className="page-container flex flex-col justify-center items-center"></div>
      </div>
    </main>
  );
};

export default SingleWorkoutPage;
