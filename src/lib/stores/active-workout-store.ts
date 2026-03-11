"use client";

import { ActiveWorkoutStore } from "@/types/index";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useActiveWorkoutStore = create<ActiveWorkoutStore>()(
  persist(
    (set) => ({
      workoutId: null,
      hasHydrated: false,

      setWorkoutId: (workoutId) => set({ workoutId }),
      removeWorkoutId: () => set({ workoutId: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "active-workout-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
