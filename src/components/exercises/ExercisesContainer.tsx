"use client";

import { createContext, useContext, useTransition, ReactNode } from "react";

interface ExercisesContextType {
  isPending: boolean;
  startTransition: (callback: () => void) => void;
}

const ExercisesContext = createContext<ExercisesContextType | undefined>(
  undefined,
);

export function useExercisesTransition() {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error(
      "useExercisesTransition must be used within ExercisesContainer",
    );
  }
  return context;
}

export function ExercisesContainer({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();

  return (
    <ExercisesContext.Provider value={{ isPending, startTransition }}>
      {children}
    </ExercisesContext.Provider>
  );
}
