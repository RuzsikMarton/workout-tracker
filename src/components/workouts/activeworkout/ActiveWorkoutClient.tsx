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
import { startTransition, useState } from "react";
import { useTranslations } from "next-intl";
import {
  deleteWorkoutAction,
  finishWorkoutAction,
} from "@/lib/actions/workouts";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import FinishWorkoutButton from "./FinishWorkoutButton";

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
  const t = useTranslations("workoutLog");
  const tError = useTranslations("errors.codes");
  const router = useRouter();

  const handleFinishWorkout = () => {
    startTransition(async () => {
      setIsPending(true);
      const result = await finishWorkoutAction(activeWorkout.id);
      if (result.ok) {
        toast.success(t("finishedWorkoutSuccessfully"));
        router.push("/workouts");
      } else {
        toast.error(tError("FAILED_TO_FINISH_WORKOUT"));
      }
      setIsPending(false);
    });
  };

  const handleCancelWorkout = async () => {
    setIsPending(true);
    try {
      const res = await deleteWorkoutAction(activeWorkout.id);
      if (!res.ok) {
        if (res.code) {
          toast.error(tError(res.code));
        } else {
          toast.error(tError("FAILED_TO_DELETE_WORKOUT"));
        }
        return;
      }
      router.replace("/workouts");
    } catch {
      toast.error(tError("FAILED_TO_DELETE_WORKOUT"));
    } finally {
      setIsPending(false);
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
        <div className="flex flex-col lg:flex-row gap-4 justify-center mt-4">
          <FinishWorkoutButton
            isPending={isPending}
            handleFinishWorkout={handleFinishWorkout}
            className="w-full lg:w-1/3"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full lg:w-1/3 active:scale-95 transition-transform duration-150"
                disabled={isPending}
              >
                <Trash2Icon className="h-4 w-4" />
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
