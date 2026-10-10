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
import { SaveAll } from "lucide-react";
import { useTranslations } from "next-intl";

interface FinishWorkoutButtonProps {
  isPending: boolean;
  handleFinishWorkout: () => void;
  className?: string;
}

const FinishWorkoutButton = ({
  isPending,
  handleFinishWorkout,
  className,
}: FinishWorkoutButtonProps) => {
  const t = useTranslations("workoutLog");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className={`bg-brand-primary/80 dark:bg-brand-primary/55 hover:bg-brand-hover/85 dark:hover:bg-brand-hover/50 text-white hover:text-white active:scale-95 transition-transform duration-150 ${className ?? ""}`}
        >
          <SaveAll className="h-4 w-4" />
          <span className="inline">
            {isPending ? t("completing") : t("completeButton")}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="bg-card">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-black/20 text-black dark:bg-black/40 dark:text-muted-foreground">
            <SaveAll />
          </AlertDialogMedia>
          <AlertDialogTitle>{t("confirmCompleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmCompleteDescription")}
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
              onClick={handleFinishWorkout}
              disabled={isPending}
            >
              {isPending ? t("completing") : t("completeButtonDialog")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishWorkoutButton;
