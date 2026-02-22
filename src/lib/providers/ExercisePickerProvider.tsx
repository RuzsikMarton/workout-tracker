"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SheetExerciseCard from "@/components/workouts/activeworkout/SheetExerciseCard";
import SheetExerciseFilter from "@/components/workouts/activeworkout/SheetExerciseFilter";
import { ExercisePrisma } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createWorkoutExerciseAction } from "../actions/workouts";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

type Ctx = {
  open: () => void;
  close: () => void;
  exercises: ExercisePrisma[];
  toggleSelectExercise: (id: string) => void;
  selectedExercises: Set<string>;
  isSelected: (id: string) => boolean;
};

const ExercisePickerContext = createContext<Ctx | null>(null);

export const useExercisePicker = () => {
  const ctx = useContext(ExercisePickerContext);
  if (!ctx) {
    throw new Error(
      "useExercisePicker must be used within an ExercisePickerProvider",
    );
  }
  return ctx;
};

export function ExercisePickerProvider({
  exercises,
  children,
}: {
  exercises: ExercisePrisma[];
  children: React.ReactNode;
}) {
  const t = useTranslations("workoutSheet");
  const errorT = useTranslations("errors.codes");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(
    new Set(),
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const equipment = searchParams.get("equipment") || "";
  const muscleGroup = searchParams.get("muscleGroup") || "";

  const toggleSelectExercise = useCallback((id: string) => {
    setSelectedExercises((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: string) => {
      return selectedExercises.has(id);
    },
    [selectedExercises],
  );

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value: Ctx = useMemo(() => {
    return {
      open,
      close,
      exercises,
      toggleSelectExercise,
      selectedExercises,
      isSelected,
    };
  }, [
    open,
    close,
    exercises,
    toggleSelectExercise,
    selectedExercises,
    isSelected,
  ]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesMuscle =
        !muscleGroup || exercise.muscleGroup.includes(muscleGroup);
      const matchesEquipment =
        !equipment || exercise.equipment.includes(equipment);
      return matchesMuscle && matchesEquipment;
    });
  }, [exercises, equipment, muscleGroup]);

  const handleAddSelected = async () => {
    setError(null);
    try {
      setPending(true);
      const exerciseIds = Array.from(selectedExercises);
      const res = await createWorkoutExerciseAction(exerciseIds);
      if (!res?.ok) {
        setError(
          res.code
            ? errorT(res.code)
            : "Failed to add exercises. Please try again.",
        );
        return;
      }
      setSelectedExercises(new Set());
      close();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <ExercisePickerContext.Provider value={value}>
      {children}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="bg-zinc-50 dark:bg-secondary max-h-screen overflow-y-scroll">
          <SheetHeader className="text-center">
            <SheetTitle className="text-xl text-muted-foreground dark:text-white uppercase underline underline-offset-4 decoration-red-700 font-stretch-50%">
              {t("title")}
            </SheetTitle>
            <SheetDescription>{t("subtitle")}</SheetDescription>
          </SheetHeader>
          <div>
            {error && (
              <div className="mx-2 bg-red-100 border border-red-500 text-red-600 p-2 rounded mb-4">
                <div className="flex gap-1 items-center">
                  <CircleAlert size={16} />
                  <h1 className="font-semibold">Error</h1>
                </div>
                {error}
              </div>
            )}
            <SheetExerciseFilter />
            <div className="flex flex-col items-center mt-4">
              {filteredExercises.map((exercise) => (
                <SheetExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
          {!!selectedExercises.size && (
            <div className="sticky bottom-10 left-0 right-0 dark:bg-secondary px-4">
              <Button
                className="w-full"
                size={"lg"}
                onClick={handleAddSelected}
                disabled={pending}
              >
                {pending ? t("adding") : t("addButton")}
                <span className="ml-2 inline-block rounded-full bg-badge-bg text-primary px-2 py-0.5 text-xs font-semibold">
                  {selectedExercises.size}
                </span>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </ExercisePickerContext.Provider>
  );
}
