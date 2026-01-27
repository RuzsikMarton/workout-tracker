import { ExerciseSet } from "@prisma/client";
import { useTranslations } from "next-intl";

const ExerciseSessionStatCard = ({
  type,
  workoutExercise,
}: {
  type: string;
  workoutExercise: ExerciseSet[];
}) => {
  const t = useTranslations(type);
  if (!workoutExercise) {
    return (
      <div className="rounded-xl border p-4 bg-muted/30">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("title")}
        </p>
        <p className="text-lg text-muted-foreground italic">{t("noData")}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="rounded-xl border p-4 bg-muted/30">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("title")}
        </p>
        <div className="mt-2 mb-2 p-1">
          <p className="text-lg font-bold">{t("dateLabel")}</p>
        </div>
        <div className="grid grid-cols-4 gap-4 border-b mb-2 p-1 text-center">
          <p className="text-sm text-muted-foreground">{t("setLabel")}</p>
          <p className="text-sm text-muted-foreground">{t("repsLabel")}</p>
          <p className="text-sm text-muted-foreground">{t("weightLabel")}</p>
          <p className="text-sm text-muted-foreground text-end">
            {t("volumeLabel")}
          </p>
        </div>
        <div>
          {/* Data Rows would go here */}
          {workoutExercise.map((set) => (
            <div
              key={set.id}
              className="grid grid-cols-4 gap-4 p-1 text-center"
            >
              <p className="text-sm">{set.setNumber}</p>
              <p className="text-sm">{set.reps}</p>
              <p className="text-sm text-center">{set.weight} KG</p>
              <p className="text-sm text-end">{set.reps * set.weight} KG</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSessionStatCard;
