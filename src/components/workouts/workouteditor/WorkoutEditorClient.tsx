"use client";

import { ExercisePickerProvider } from "@/lib/providers/ExercisePickerProvider";
import { WorkoutWithExercises } from "@/types";
import { ExercisePrisma } from "@/types/exercises";
import WorkoutExerciseList from "../shared/WorkoutExerciseList";
import WorkoutEditHeader from "./WorkoutEditHeader";

const WorkoutEditorClient = ({
  workout,
  sheetExercises,
}: {
  workout: WorkoutWithExercises;
  sheetExercises: ExercisePrisma[];
}) => {
  return (
    <ExercisePickerProvider workoutId={workout.id} exercises={sheetExercises}>
      <WorkoutEditHeader workout={workout} />
      <div className="page-container my-4">
        <div className="border-2 dark:border-primary-foreground/50 rounded-lg overflow-hidden">
          <WorkoutExerciseList workoutExercises={workout.workoutExercises} />
        </div>
      </div>
    </ExercisePickerProvider>
  );
};

export default WorkoutEditorClient;
