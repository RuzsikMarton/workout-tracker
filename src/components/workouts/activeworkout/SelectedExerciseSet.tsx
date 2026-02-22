"use client";

import { Button } from "@/components/ui/button";
import { ExerciseSet } from "@prisma/client";
import { Check, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  updateExerciseSetAction,
  toggleSetCompletedAction,
  deleteExerciseSetAction,
} from "@/lib/actions/exercise-set";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const SelectedExerciseSet = ({ set }: { set: ExerciseSet }) => {
  const errorT = useTranslations("errors.codes");
  const [reps, setReps] = useState<number | "">(set.reps);
  const [weight, setWeight] = useState<number | "">(set.weight);
  const [isCompleted, setIsCompleted] = useState(set.completed);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const saveSet = useDebouncedCallback(async (reps: number, weight: number) => {
    if (reps === set.reps && weight === set.weight) return;
    reps = Math.max(0, reps);
    weight = Math.max(0, weight);
    setIsSaving(true);
    setError(null);
    const result = await updateExerciseSetAction(set.id, { reps, weight });
    if (!result.ok) {
      setError(
        result.code
          ? errorT(result.code)
          : "Failed to update set. Please try again.",
      );
    }
    setIsSaving(false);
  }, 1000);

  const handleToggleCompleted = async () => {
    try {
      setIsCompleted(!isCompleted);
      setError(null);
      const result = await toggleSetCompletedAction(set.id);
      if (!result.ok) {
        setError(
          result.code
            ? errorT(result.code)
            : "Failed to toggle set completion. Please try again.",
        );
        setIsCompleted(isCompleted);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsCompleted(isCompleted);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      const result = await deleteExerciseSetAction(set.id);

      if (!result.ok) {
        setError(
          result.code
            ? errorT(result.code)
            : "Failed to delete set. Please try again.",
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "grid grid-cols-4 gap-2 md:gap-3 border-b py-3 transition-opacity px-1 md:px-2",
          isCompleted && "opacity-65 bg-green-500/10",
          isSaving && "opacity-65",
          error && "border-destructive/50 bg-destructive/5",
        )}
      >
        <p className="flex items-center text-sm md:text-base">
          {set.setNumber}
        </p>
        <input
          type="number"
          className={cn(
            "w-16 md:w-20 border-b bg-muted-foreground/5 dark:bg-muted px-2 py-1 text-sm md:text-base focus:outline-none focus:ring-3 focus:ring-border focus:rounded disabled:opacity-50",
            error && "border-destructive",
          )}
          value={reps}
          min={0}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              setReps("");
              return;
            }
            const n = Number(v);
            if (Number.isNaN(n)) return;
            setReps(n);
            saveSet(n, weight === "" ? 0 : weight);
          }}
          onBlur={() => {
            if (reps === "") {
              setReps(0);
              saveSet(0, weight === "" ? 0 : weight);
            }
          }}
          disabled={isCompleted}
        />
        <input
          type="number"
          step="0.5"
          className={cn(
            "w-16 md:w-20 border-b bg-muted-foreground/5 dark:bg-muted px-2 py-1 text-sm md:text-base focus:outline-none focus:ring-3 focus:ring-border focus:rounded disabled:opacity-50",
            error && "border-destructive",
          )}
          value={weight}
          min={0}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              setWeight("");
              return;
            }
            const n = Number(v);
            if (Number.isNaN(n)) return;
            setWeight(n);
            saveSet(reps === "" ? 0 : reps, n);
          }}
          onBlur={() => {
            if (weight === "") {
              setWeight(0);
              saveSet(reps === "" ? 0 : reps, 0);
            }
          }}
          disabled={isCompleted}
        />
        <div className="flex justify-end items-center gap-1 md:gap-2">
          <Button
            variant={isCompleted ? "default" : "outline"}
            size="icon"
            className={cn(
              "h-6 w-6 md:h-7 md:w-7 hover:bg-success/75!",
              isCompleted && "bg-success hover:bg-green-800",
            )}
            onClick={handleToggleCompleted}
            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-6 w-6 md:h-7 md:w-7 hover:bg-brand-hover/75!",
              isSaving && "pointer-events-none opacity-70",
            )}
            disabled={isSaving}
            onClick={handleDelete}
            title="Delete set"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1 px-2 py-1 text-xs text-destructive bg-destructive/10 rounded-b border-x border-b border-destructive/30">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectedExerciseSet;
