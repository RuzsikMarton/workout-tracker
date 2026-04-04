"use client";

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
import { Button } from "@/components/ui/button";
import {
  deleteWorkoutAction,
  updateWorkoutTitleAction,
} from "@/lib/actions/workouts";
import { WorkoutWithExercises } from "@/types";
import { ArrowBigLeft, SquarePen, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const WorkoutEditHeader = ({ workout }: { workout: WorkoutWithExercises }) => {
  const router = useRouter();
  const t = useTranslations("workoutEditHeader");
  const tError = useTranslations("errors.codes");
  const [title, setTitle] = useState(workout.title);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await deleteWorkoutAction(workout.id);
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

  const handleTitleChange = useDebouncedCallback(async (newTitle: string) => {
    await updateWorkoutTitleAction(workout.id, newTitle);
  }, 1000);

  return (
    <div className="bg-section-bg px-4 md:px-16 lg:px-32 py-4 space-y-4">
      <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
        <Button
          variant="outline"
          onClick={() => router.push(`/workouts/${workout.id}`)}
        >
          <ArrowBigLeft className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">← {t("backButton")}</span>
        </Button>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("nameLabel")}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleTitleChange(e.target.value);
            }}
            className="w-full border-b-2 border-muted-foreground pl-3 pr-10 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:rounded-md focus:ring-ring"
          />
          <SquarePen className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        {/* Buttons */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
              disabled={isPending}
            >
              <Trash2Icon className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">
                {isPending ? t("deleting") : t("deleteButton")}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm" className="bg-card">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>{t("confirmDeleteTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("confirmDeleteDescription")}
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
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? t("deleting") : t("deleteButton")}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default WorkoutEditHeader;
