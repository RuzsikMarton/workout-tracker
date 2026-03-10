"use client";

import { useTranslations } from "next-intl";

const Last28Days = ({
  data,
  workoutCount,
}: {
  data: any[];
  workoutCount: number;
}) => {
  const t = useTranslations("profile.last28Days");

  if (!data.length)
    return (
      <div className="profile-card h-full flex items-center justify-center">
        <span className="text-muted-foreground text-center">{t("noData")}</span>
      </div>
    );
  return (
    <div className="profile-card h-full">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("workoutLabel")}
          </span>
          <span className="text-2xl font-bold text-brand-primary">
            {workoutCount}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("volumeLabel")}
          </span>
          <span className="text-2xl font-bold text-brand-primary">
            {data.reduce((sum, workout) => sum + workout.totalVolume, 0)}{" "}
            <span className="text-base font-normal text-muted-foreground">
              kg
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("durationLabel")}
          </span>
          <span className="text-2xl font-bold text-brand-primary">
            {Math.round(
              data.reduce((sum, workout) => sum + workout.duration, 0) / 60,
            )}{" "}
            <span className="text-base font-normal text-muted-foreground">
              min
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            {t("exercisesLabel")}
          </span>
          <span className="text-2xl font-bold text-brand-primary">
            {data.reduce(
              (sum, workout) => sum + workout._count.workoutExercises,
              0,
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Last28Days;
