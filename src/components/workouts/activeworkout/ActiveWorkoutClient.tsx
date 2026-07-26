"use client";

import { ExercisePickerProvider } from "@/lib/providers/ExercisePickerProvider";
import WorkoutExerciseList from "../shared/WorkoutExerciseList";
import { ExercisePrisma, WorkoutWithExercises } from "@/types";
import ActiveWorkoutHeader from "./ActiveWorkoutHeader";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { deleteWorkoutAction } from "@/lib/actions/workouts";
import { useRouter } from "@/i18n/navigation";

const ActiveWorkoutClient = ({
  activeWorkout,
  sheetExercises,
  totalVolume,
}: {
  activeWorkout: WorkoutWithExercises;
  sheetExercises: ExercisePrisma[];
  totalVolume: number;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("workoutLog");
  const tError = useTranslations("errors.codes");
  const router = useRouter();

  const handleCancelWorkout = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await deleteWorkoutAction(activeWorkout.id);
      if (!res.ok) {
        setError(
          res.code ? tError(res.code) : tError("FAILED_TO_DELETE_WORKOUT"),
        );
      }
      if (res.ok) {
        router.replace("/workouts");
      }
    } catch (err) {
      setError(tError("FAILED_TO_DELETE_WORKOUT"));
    }
  };
  return (
    <ExercisePickerProvider
      workoutId={activeWorkout.id}
      exercises={sheetExercises}
    >
      <ActiveWorkoutHeader
        activeWorkout={activeWorkout}
        totalVolume={totalVolume}
      />
      <div className="page-container my-4">
        <div className="border-2 dark:border-primary-foreground/50 rounded-lg overflow-hidden">
          <WorkoutExerciseList
            workoutExercises={activeWorkout.workoutExercises}
          />
        </div>
        <div className="flex justify-center mt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full lg:w-1/2 bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white active:scale-95 transition-transform duration-150"
                disabled={isPending}
              >
                <Trash2Icon className="h-4 w-4 hidden" />
                <span className="inline">
                  {isPending ? t("cancelingWorkout") : t("cancelWorkoutButton")}
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" className="bg-card">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle>{t("confirmCancelTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("confirmCancelDescription")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">
                  {t("cancelButton")}
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant={"outline"}
                    className="bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
                    onClick={handleCancelWorkout}
                    disabled={isPending}
                  >
                    {isPending
                      ? t("cancelingWorkout")
                      : t("cancelWorkoutButton")}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </ExercisePickerProvider>
  );
};

export default ActiveWorkoutClient;
