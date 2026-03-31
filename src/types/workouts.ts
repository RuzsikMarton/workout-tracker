import {
  Exercise,
  ExerciseSet,
  Workout,
  WorkoutExercise,
} from "@prisma/client";

export type WorkoutExerciseWithSets = WorkoutExercise & {
  sets: ExerciseSet[];
};

export type WorkoutExerciseWithData = WorkoutExercise & {
  exercise: Exercise;
  sets: ExerciseSet[];
};

export type WorkoutWithExercises = Workout & {
  workoutExercises: WorkoutExerciseWithData[];
};

export type WorkoutWithPartialExercises = Workout & {
  workoutExercises: {
    exerciseId: string;
  }[];
};

export type ChartWorkout = {
  id: string;
  createdAt: Date;
  duration: number | null;
  totalVolume: number | null;
};
