"use client";

import { ExerciseSet } from "@prisma/client";

const SelectedExerciseSet = ({
  set,
  setIndex,
  workoutExerciseId,
}: {
  set: ExerciseSet;
  setIndex: number;
  workoutExerciseId: string;
}) => {
  return <div>SelectedExerciseSet</div>;
};

export default SelectedExerciseSet;
