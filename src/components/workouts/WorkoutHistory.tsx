"use client";
import { Info, SearchX } from "lucide-react";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const WorkoutHistory = ({
  workoutHistory,
  totalCount,
  page,
  pageSize,
}: {
  workoutHistory: any[];
  totalCount: number;
  page: number;
  pageSize: number;
}) => {
  const t = useTranslations("WorkoutHistory");
  if (!workoutHistory?.length) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 uppercase font-stretch-50% underline underline-offset-4 decoration-red-700">
          {t("title")}
        </h2>
        <div className="w-max-7xl mx-auto mt-4 rounded-xl border p-6 text-center">
          <SearchX className="mx-auto mb-4 h-6 w-6 text-muted-foreground" />
          <p className="font-medium">{t("noWorkoutsTitle")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("noWorkoutsMessage")}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 uppercase font-stretch-50% underline underline-offset-4 decoration-red-700">
        {t("title")}
      </h2>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="p-3 text-left font-semibold">{t("nameLabel")}</th>
              <th className="p-3 text-left font-semibold">{t("dateLabel")}</th>
              <th className="p-3 text-center font-semibold">
                {t("durationLabel")}
              </th>
              <th className="p-3 text-center font-semibold">
                {t("detailsLabel")}
              </th>
            </tr>
          </thead>
          <tbody>
            {workoutHistory.map((workout) => (
              <tr
                key={workout.id}
                className="border-b hover:bg-muted/50 transition-colors"
              >
                <td className="p-3">
                  {workout.title.length > 15
                    ? workout.title.substring(0, 15) + "..."
                    : workout.title}
                </td>
                <td className="p-3">{workout.createdAt.toDateString()}</td>
                <td className="p-3 text-center">
                  {workout.duration
                    ? `${Math.floor(workout.duration / 60)} min`
                    : "N/A"}
                </td>
                <td className="p-3 text-center">
                  <Link href={`/workouts/${workout.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-700/75 dark:bg-red-800/50 dark:hover:bg-red-700 hover:bg-red-800 text-white hover:text-white"
                    >
                      <Info className="h-4 w-4" />
                      <span className="hidden md:inline ml-1">
                        {t("detailsButton")}
                      </span>
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {" "}
        <PaginationWithLinks
          page={page}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default WorkoutHistory;
