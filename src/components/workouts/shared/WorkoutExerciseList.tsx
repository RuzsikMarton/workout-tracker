"use client";

import { useExercisePicker } from "@/lib/providers/ExercisePickerProvider";
import { WorkoutExerciseWithData } from "@/types";
import { Plus, Dumbbell } from "lucide-react";
import SelectedExerciseCard from "./SelectedExerciseCard";
import { useTranslations } from "next-intl";

const WorkoutExerciseList = ({
  workoutExercises,
}: {
  workoutExercises: WorkoutExerciseWithData[];
}) => {
  const t = useTranslations("workoutLog");
  const picker = useExercisePicker();
  return (
    <div className="flex flex-col bg-muted-foreground/5">
      {workoutExercises.map((exercise) => (
        <div key={exercise.id} className="border-b py-2">
          <SelectedExerciseCard workoutExercise={exercise} />
        </div>
      ))}
      <div className="p-4">
        <button
          onClick={picker.open}
          className="group w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background dark:bg-secondary hover:bg-muted/40 hover:border-muted-foreground/50 transition-all duration-200 py-6 px-4 flex flex-col items-center justify-center gap-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <Plus className="h-5 w-5" />
            <Dumbbell className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {t("addExerciseButton")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutExerciseList;
