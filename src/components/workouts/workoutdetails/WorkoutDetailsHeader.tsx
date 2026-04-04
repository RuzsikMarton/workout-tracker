"use client";

import { Button } from "@/components/ui/button";
import { deleteWorkoutAction } from "@/lib/actions/workouts";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

const WorkoutDetailsHeader = ({
  id,
  duration,
  volume,
  sets,
}: {
  id: string;
  duration: number | null;
  volume: number | null;
  sets: number;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations("workoutDetails");
  const tError = useTranslations("errors.codes");

  const handleDelete = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await deleteWorkoutAction(id);
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
    <div className="bg-section-bg py-4">
      <div className="page-container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-between gap-2 md:ml-auto md:order-2">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* Need to implement edit workout functionality */}
          <Button
            size={"lg"}
            variant={"outline"}
            disabled={isPending}
            onClick={() => router.push(`/workouts/${id}/edit`)}
          >
            {t("editButton")}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size={"lg"}
                variant={"outline"}
                className="bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white"
                disabled={isPending}
              >
                {isPending ? t("deleting") : t("deleteButton")}
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
        <div className="flex items-center justify-between md:justify-start md:gap-16 lg:gap-32 md:order-1">
          <div>
            <span className="text-sm text-muted-foreground">
              {t("durationLabel")}
            </span>
            <p className="text-lg font-medium">
              {duration != null ? `${Math.round(duration / 60)} min` : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              {t("volumeLabel")}
            </span>
            <p className="text-lg font-medium">
              {volume != null ? `${volume} kg` : "N/A"}
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              {t("setsLabel")}
            </span>
            <p className="text-lg font-medium">{sets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsHeader;
