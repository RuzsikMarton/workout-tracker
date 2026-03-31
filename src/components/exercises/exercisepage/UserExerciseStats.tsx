"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserExerciseStats as UserExerciseStatsType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import WorkoutExerciseStatTable from "./WorkoutExerciseStatTable";
import { WorkoutExerciseWithSets } from "@/types/workouts";

type Props = {
  stats: UserExerciseStatsType | null;
  isAuthenticated: boolean;
  bestWorkoutExercise: WorkoutExerciseWithSets | null;
  lastWorkoutExercise: WorkoutExerciseWithSets | null;
};

const UserExerciseStats = ({
  stats,
  isAuthenticated,
  bestWorkoutExercise,
  lastWorkoutExercise,
}: Props) => {
  const [tabsValue, setTabsValue] = useState("last");
  const t = useTranslations("ExercisePage.userStats");
  if (!isAuthenticated) {
    return (
      <div className="page-container py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("signInTitle")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("signInPrompt")}
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page-container py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("noStatsTitle")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("noStatsMessage")}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="page-container py-4 space-y-2">
      <h1 className="text-xl lg:text-2xl font-light uppercase tracking-tight text-foreground">
        {t("yourStatsTitle")}
      </h1>
      <p className="text-sm text-muted-foreground">
        {t("yourStatsDescription")}
      </p>
      {/* Stats cards */}
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-r p-4 lg:border-b-0">
            <p className="text-sm text-muted-foreground">
              {t("heaviestSetLabel")}
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestSetWeight && stats.bestSetReps
                ? `${stats.bestSetReps} × ${stats.bestSetWeight} kg`
                : "N/A"}
            </p>
          </div>

          <div className="border-b p-4 lg:border-b-0 lg:border-r">
            <p className="text-sm text-muted-foreground">
              {t("bestVolumeLabel")}
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestVolume ? `${stats.bestVolume} kg` : "N/A"}
            </p>
          </div>

          <div className="border-r p-4 lg:border-r">
            <p className="text-sm text-muted-foreground">
              {t("best1ERMLabel")}
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.bestE1RM ? `${stats.bestE1RM.toFixed(1)} kg` : "N/A"}
            </p>
          </div>

          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              {t("lastPerformedLabel")}
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {stats.lastPerformed
                ? new Date(stats.lastPerformed).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <Tabs value={tabsValue} onValueChange={setTabsValue}>
          <TabsList
            variant="default"
            className="bg-secondary dark:bg-background/60 rounded-full py-5"
          >
            <TabsTrigger
              value="last"
              className="p-4 rounded-full text-lg font-light"
            >
              {t("lastLabel")}
            </TabsTrigger>
            <TabsTrigger
              value="best"
              className="p-4 rounded-full text-lg font-light"
            >
              {t("bestLabel")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Card className="w-full mt-4">
          <WorkoutExerciseStatTable
            workout={
              tabsValue === "last" ? lastWorkoutExercise : bestWorkoutExercise
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default UserExerciseStats;
