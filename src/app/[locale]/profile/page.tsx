import Last28Days from "@/components/profile/Last28Days";
import UserCard from "@/components/profile/UserCard";
import WorkoutChart from "@/components/profile/WorkoutChart";
import WorkoutTrendsChart from "@/components/profile/WorkoutTrendsChart";
import { requireSessionOrRedirect } from "@/lib/auth-helpers";
import { getUserProfile } from "@/lib/data/get-profile";

const ProfilePage = async () => {
  const session = await requireSessionOrRedirect();
  const data = await getUserProfile(session.user.id);

  return (
    <main className="page-main app-layout">
      <div className="page-container py-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 order-0 ">
          <UserCard user={session.user} totalWorkouts={data.totalWorkouts} />
        </div>
        <div className="col-span-12 md:col-span-6 order-2 md:order-1 ">
          <WorkoutChart workouts={data.last28} />
        </div>
        <div className="col-span-12 md:col-span-4 order-1 md:order-2">
          <Last28Days
            data={data.last28}
            workoutCount={data.last28WorkoutCount}
          />
        </div>
        <div className="col-span-12 md:col-span-8 order-4">
          <WorkoutTrendsChart workouts={data.last28} />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
