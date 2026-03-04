import PageTitle from "@/components/PageTitle";
import WorkoutDetailsCard from "@/components/workouts/workoutdetails/WorkoutDetailsCard";
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
          id={workout.id}
          duration={workout.duration}
          volume={workout.totalVolume}
          sets={workout.workoutExercises.reduce(
            (acc, we) => acc + we.sets.length,
            0,
          )}
        />
        <div className="page-container flex flex-col justify-center items-center py-4 lg:py-8">
          {workout.workoutExercises.map((we) => (
            <WorkoutDetailsCard
              key={we.id}
              exercise={we.exercise}
              sets={we.sets}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default SingleWorkoutPage;
