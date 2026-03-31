"use client";

import { WorkoutExerciseWithSets } from "@/types";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const WorkoutExerciseStatTable = ({
  workout,
}: {
  workout: WorkoutExerciseWithSets | null;
}) => {
  const t = useTranslations("ExercisePage.userStats.statTable");
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(t("date"), {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      {workout && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(workout.createdAt)}</span>
        </div>
      )}
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="py-3 text-center text-sm font-medium text-muted-foreground">
              {t("sets")}
            </th>
            <th className="py-3 text-center text-sm font-medium text-muted-foreground">
              {t("weight")}
            </th>
            <th className="py-3 text-center text-sm font-medium text-muted-foreground">
              {t("reps")}
            </th>
            <th className="py-3 text-center text-sm font-medium text-muted-foreground">
              {t("volume")}
            </th>
          </tr>
        </thead>
        <tbody>
          {workout ? (
            workout.sets.map((set, index) => (
              <tr
                key={set.id}
                className="border-b last:border-0 transition-colors hover:bg-muted/50"
              >
                <td className="py-3 text-center text-sm font-medium">
                  {index + 1}
                </td>
                <td className="py-3 text-center text-sm font-semibold">
                  {set.weight} <span className="text-muted-foreground">kg</span>
                </td>
                <td className="py-3 text-center text-sm font-semibold">
                  {set.reps}
                </td>
                <td className="py-3 text-center text-sm font-medium text-muted-foreground">
                  {(set.weight * set.reps).toFixed(1)}{" "}
                  <span className="text-muted-foreground/70">kg</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-sm text-muted-foreground"
              ></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutExerciseStatTable;
