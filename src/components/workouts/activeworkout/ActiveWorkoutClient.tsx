"use client";

import { ExercisePickerProvider } from "@/lib/providers/ExercisePickerProvider";
import WorkoutExerciseList from "./WorkoutExerciseList";
import { ExercisePrisma, WorkoutWithExercises } from "@/types";
import ActiveWorkoutHeader from "./ActiveWorkoutHeader";

const ActiveWorkoutClient = ({
  activeWorkout,
  sheetExercises,
  totalVolume,
}: {
  activeWorkout: WorkoutWithExercises;
  sheetExercises: ExercisePrisma[];
  totalVolume: number;
}) => {
  return (
    <ExercisePickerProvider exercises={sheetExercises}>
      <ActiveWorkoutHeader
        activeWorkout={activeWorkout}
        totalVolume={totalVolume}
      />
      <div className="page-container my-4">
        <div className="border-2 dark:border-primary-foreground/50 rounded-lg overflow-hidden">
          <WorkoutExerciseList
            workoutExercises={activeWorkout.workoutExercises}
          />
        </div>
      </div>
    </ExercisePickerProvider>
  );
};

export default ActiveWorkoutClient;
