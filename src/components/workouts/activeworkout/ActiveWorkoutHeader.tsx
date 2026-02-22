"use client";

import { Button } from "@/components/ui/button";
import TimerWorkout from "../TimerWorkout";
import { AlertCircle, ArrowBigLeft, SaveAll, SquarePen } from "lucide-react";
import { redirect } from "next/navigation";
import { WorkoutWithExercises } from "@/types";
import { useDebouncedCallback } from "use-debounce";
import { useState, useTransition } from "react";
import {
  updateWorkoutTitleAction,
  finishWorkoutAction,
} from "@/lib/actions/workouts";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ActiveWorkoutHeader = ({
  activeWorkout,
  totalVolume,
}: {
  activeWorkout: WorkoutWithExercises;
  totalVolume: number;
}) => {
  const t = useTranslations("workoutLog");
  const [title, setTitle] = useState(activeWorkout.title);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = useDebouncedCallback(async (newTitle: string) => {
    await updateWorkoutTitleAction(activeWorkout.id, newTitle);
  }, 1000);

  const handleFinishWorkout = () => {
    startTransition(async () => {
      setError(null);
      const result = await finishWorkoutAction(activeWorkout.id);
      if (result.ok) {
        router.push("/workouts");
      } else {
        setError("Failed to finish workout");
      }
    });
  };
  return (
    <div className="bg-section-bg px-4 md:px-16 lg:px-32 py-4 space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
        <Button variant="outline" onClick={() => redirect("/workouts")}>
          <ArrowBigLeft className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">← {t("backButton")}</span>
        </Button>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Workout name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleTitleChange(e.target.value);
            }}
            className="w-full border-b-2 border-muted-foreground pl-3 pr-10 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:rounded-md focus:ring-ring"
          />
          <SquarePen className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button
          variant="outline"
          onClick={handleFinishWorkout}
          disabled={isPending}
          className="bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
        >
          <SaveAll className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">
            {isPending ? t("completing") : t("completeButton")}
          </span>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 py-2">
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">
            {t("durationLabel")}
          </p>
          <TimerWorkout createdAt={activeWorkout.createdAt} />
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">
            {t("volumeLabel")}
          </p>
          <p className="text-lg font-semibold">{totalVolume} kg</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">
            {t("exercisesLabel")}
          </p>
          <p className="text-lg font-semibold">
            {activeWorkout?.workoutExercises?.length || 0}
          </p>
        </div>
        {error && (
          <div className="bg-error-bg border p-4 border-error-border rounded text-destructive col-span-3">
            <div className="flex items-center">
              {" "}
              <AlertCircle className="h-5 w-5 inline-block mr-2" />
              <span className="text-lg font-semibold">Error</span>
            </div>

            <p className="text col-span-3">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveWorkoutHeader;
