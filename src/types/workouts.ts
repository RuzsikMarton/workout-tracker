import {
  Exercise,
  ExerciseSet,
  Workout,
  WorkoutExercise,
} from "@prisma/client";

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
    sets: ExerciseSet[];
  }[];
};
