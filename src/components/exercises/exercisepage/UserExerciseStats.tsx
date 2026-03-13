"use client";

import { useSession } from "@/lib/client";
import { UserExerciseStats as UserExerciseStatsType } from "@prisma/client";

type Props = {
  stats: UserExerciseStatsType | null;
};

const UserExerciseStats = ({ stats }: Props) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="page-container py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page-container py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            Sign in to view your stats
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to see your personal records, last session, and exercise
            history.
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page-container py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">No stats yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete a workout with this exercise and your stats will show up
            here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="page-container py-4 space-y-2">
      <h1 className="text-xl lg:text-2xl font-light uppercase tracking-tight text-foreground">
        Your Stats
      </h1>
      <p className="text-sm text-muted-foreground">
        Personal records and latest performance for this exercise.
      </p>
      {/* Stats cards */}
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-r p-4 lg:border-b-0">
            <p className="text-sm text-muted-foreground">Heaviest Set</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestSetWeight && stats.bestSetReps
                ? `${stats.bestSetReps} × ${stats.bestSetWeight} kg`
                : "N/A"}
            </p>
          </div>

          <div className="border-b p-4 lg:border-b-0 lg:border-r">
            <p className="text-sm text-muted-foreground">Best Volume</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestVolume ? `${stats.bestVolume} kg` : "N/A"}
            </p>
          </div>

          <div className="border-r p-4 lg:border-r">
            <p className="text-sm text-muted-foreground">Best E1RM</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestE1RM ? `${stats.bestE1RM.toFixed(1)} kg` : "N/A"}
            </p>
          </div>

          <div className="p-4">
            <p className="text-sm text-muted-foreground">Last Performed</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.lastPerformed
                ? new Date(stats.lastPerformed).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserExerciseStats;
