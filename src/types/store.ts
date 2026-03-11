export type ActiveWorkoutStoreState = {
  workoutId: string | null;
  hasHydrated: boolean;
};

export type ActiveWorkoutStoreActions = {
  setWorkoutId: (workoutId: string | null) => void;
  removeWorkoutId: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export type ActiveWorkoutStore = ActiveWorkoutStoreState &
  ActiveWorkoutStoreActions;
