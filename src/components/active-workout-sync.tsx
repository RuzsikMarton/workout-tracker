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
  const hasHydrated = useActiveWorkoutStore((state) => state.hasHydrated);

  useEffect(() => {
    // Only sync after hydration to prevent flash
    if (!hasHydrated) return;

    if (workoutId) {
      setWorkoutId(workoutId);
    } else {
      removeWorkoutId();
    }
  }, [workoutId, setWorkoutId, removeWorkoutId, hasHydrated]);

  return null;
};

export default ActiveWorkoutSync;
