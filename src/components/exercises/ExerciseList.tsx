"use client";

import { AlertTriangle, SearchX } from "lucide-react";
import ExerciseCard from "./ExerciseCard";
import { useTranslations } from "next-intl";
import { ExercisePrisma } from "@/types";
import { useExercisesTransition } from "./ExercisesContainer";
import { LoadingSpinner } from "../ui/loading-spinner";

const ExerciseList = ({
  exercises,
  error,
}: {
  exercises: ExercisePrisma[];
  error: string | null;
}) => {
  const t = useTranslations("ExerciseList");
  const { isPending } = useExercisesTransition();

  if (error) {
    return (
      <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
        <AlertTriangle className="mx-auto mb-4 h-6 w-6 text-red-700 dark:text-red-500" />
        <p className="font-medium">{t("errorTitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("errorMessage")}
        </p>
      </div>
    );
  }

  if (!exercises?.length) {
    return (
      <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
        <SearchX className="mx-auto mb-4 h-6 w-6 text-muted-foreground" />
        <p className="font-medium">{t("noExercisesTitle")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("noExercisesMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
