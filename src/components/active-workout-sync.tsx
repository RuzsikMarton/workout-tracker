"use client";

import { useActiveWorkoutStore } from "@/lib/stores/active-workout-store";
import { useEffect } from "react";

type Props = {
  workoutId: string | null;
};

const ActiveWorkoutSync = ({ workoutId }: Props) => {
  const setWorkoutId = useActiveWorkoutStore((state) => state.setWorkoutId);
  const removeWorkoutId = useActiveWorkoutStore(
    (state) => state.removeWorkoutId,
  );

  useEffect(() => {
    if (workoutId) {
      setWorkoutId(workoutId);
    } else {
      removeWorkoutId();
    }
  }, [workoutId, setWorkoutId, removeWorkoutId]);
  return null;
};

export default ActiveWorkoutSync;
