import { AlertTriangle, SearchX } from "lucide-react";
import ExerciseSkeleton from "./ExerciseSkeleton";
import ExereciseCard from "./ExerciseCard";
import { useTranslations } from "next-intl";
import { PaginationWithLinks } from "../ui/pagination-with-links";

const items = [
  {
    id: "1",
    name: "push-ups",
    muscleGroup: ["Chest"],
    equipment: ["Bodyweight"],
  },
  {
    id: "2",
    name: "squats",
    muscleGroup: ["Legs"],
    equipment: ["Bodyweight"],
  },
  {
    id: "3",
    name: "bench-press",
    muscleGroup: ["Chest"],
    equipment: ["Barbell"],
  },
];

const ExerciseList = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) => {
  const t = useTranslations("ExerciseList");
  if (isLoading) {
    return (
      <div className="space-y-4">
        <ExerciseSkeleton />
      </div>
    );
  }
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

  if (!items?.length) {
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
    <div>
      {items.map((exercise) => (
        <ExereciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
