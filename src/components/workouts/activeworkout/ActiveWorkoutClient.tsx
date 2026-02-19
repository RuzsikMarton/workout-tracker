"use client";

import { ExercisePickerProvider } from "@/lib/providers/ExercisePickerProvider";
import WorkoutExerciseList from "./WorkoutExerciseList";
import { ExercisePrisma, WorkoutWithExercises } from "@/types";
import ActiveWorkoutHeader from "./ActiveWorkoutHeader";

const ActiveWorkoutClient = ({
  activeWorkout,
  sheetExercises,
}: {
  activeWorkout: WorkoutWithExercises;
  sheetExercises: ExercisePrisma[];
}) => {
  return (
    <ExercisePickerProvider exercises={sheetExercises}>
      <ActiveWorkoutHeader activeWorkout={activeWorkout} />
      <div className="page-container my-4">
        <div className="border-2 rounded-lg overflow-hidden">
          <WorkoutExerciseList
            workoutExercises={activeWorkout.workoutExercises}
          />
        </div>
      </div>
    </ExercisePickerProvider>
  );
};

export default ActiveWorkoutClient;
