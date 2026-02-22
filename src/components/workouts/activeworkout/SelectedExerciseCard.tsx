"use client";

import { Button } from "@/components/ui/button";
import { WorkoutExerciseWithData } from "@/types";
import { AlertCircle, Check, Plus, Weight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SelectedExerciseSet from "./SelectedExerciseSet";
import { useState, useTransition } from "react";
import { createExerciseSetAction } from "@/lib/actions/exercise-set";
import { cn } from "@/lib/utils";
import { removeWorkoutExerciseAction } from "@/lib/actions/workouts";

const SelectedExerciseCard = ({
  workoutExercise,
}: {
  workoutExercise: WorkoutExerciseWithData;
}) => {
  const t = useTranslations("selectedExerciseCard");
  const tE = useTranslations(workoutExercise.exercise.name);
  const errorT = useTranslations("errors.codes");

  const [error, setError] = useState<string | null>(null);
  const [isAddingPending, startAddTransition] = useTransition();
  const [isRemovingPending, startRemoveTransition] = useTransition();

  async function handleSetUpdate(exerciseId: string) {
    startAddTransition(async () => {
      setError(null);
      try {
        const res = await createExerciseSetAction(exerciseId);
        if (!res?.ok) {
          setError(
            res.code
              ? errorT(res.code)
              : "Failed to add set. Please try again.",
          );
          return;
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  async function handleRemoveExercise() {
    startRemoveTransition(async () => {
      setError(null);
      try {
        const res = await removeWorkoutExerciseAction(workoutExercise.id);
        if (!res?.ok) {
          setError(
            res.code
              ? errorT(res.code)
              : "Failed to remove exercise. Please try again.",
          );
          return;
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    });
  }
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-4 pb-4">
        <div className="shrink-0 p-2 rounded-full bg-muted-foreground/25">
          <Image
            src={workoutExercise.exercise?.imgUrl || "/logo.webp"}
            alt={"Exercise image"}
            width={48}
            height={48}
          />
        </div>
        <span className="uppercase text-primary/90 text-sm md:text-lg font-medium flex-1 min-w-0">
          {tE("name")}
        </span>
        {/*Reorder will be implemented in the future, for now we only showing a placeholder button*/}
        <Button variant="outline" size="sm" className="shrink-0">
          ...
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isRemovingPending || isAddingPending}
          className="shrink-0 bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
          onClick={handleRemoveExercise}
        >
          <X className="h-4 w-4 md:hidden" />
          <span className="hidden md:inline">
            {isRemovingPending ? "Removing..." : "Remove Exercise"}
          </span>
        </Button>
      </div>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-4 gap-2 md:gap-3 border-b border-brand-primary/25 pb-2 px-1 md:px-2">
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase">
            Set
          </span>
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase">
            Reps
          </span>
          <div className="flex items-center text-xs md:text-sm font-medium text-muted-foreground uppercase">
            <Weight className="inline-block h-3 w-3 md:h-4 md:w-4" />
            <span className="ml-1">Kg</span>
          </div>
          <div className="flex justify-end items-center gap-1 md:gap-2">
            <div className="h-3 w-6 md:h-5 md:w-7 flex items-center justify-center">
              <Check className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </div>
            <div className="h-3 w-6 md:h-5 md:w-7 flex items-center justify-center">
              <X className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-1 px-2 py-1 text-xs text-destructive bg-destructive/10 rounded-b border-x border-b border-destructive/30">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {workoutExercise.sets.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">{t("noSets")}</p>
            </div>
          </div>
        ) : (
          workoutExercise.sets.map((set) => (
            <SelectedExerciseSet key={set.id} set={set} />
          ))
        )}
        <div
          className={cn(isAddingPending && "pointer-events-none opacity-70")}
        >
          <button
            disabled={isAddingPending || isRemovingPending}
            onClick={() => handleSetUpdate(workoutExercise.id)}
            className="group mt-4 w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background dark:bg-secondary hover:bg-muted/40 hover:border-muted-foreground/50 transition-all duration-200 py-3 px-4 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {isAddingPending ? t("addingSet") : t("addSetButton")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedExerciseCard;
