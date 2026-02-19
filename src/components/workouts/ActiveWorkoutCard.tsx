"use client";

import { Button } from "../ui/button";
import TimerWorkout from "./TimerWorkout";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createWorkoutAction } from "@/lib/actions/workouts";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ActiveWorkoutCard = ({
  activeWorkout,
}: {
  activeWorkout: any | null;
}) => {
  const t = useTranslations("ActiveWorkoutCard");
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(activeWorkout);

  const createWorkout = async () => {
    setIsCreating(true);
    setError(null);

    const result = await createWorkoutAction();

    if (!result.ok) {
      setError(result.message);
      setIsCreating(false);
      return;
    }
    router.push("/workouts/active");
    router.refresh();
  };

  if (!activeWorkout) {
    return (
      <div className="mt-4 p-4 border border-primary/25 rounded-xl border-dashed text-center bg-muted-foreground/15">
        <h2 className="text-xl text-muted-foreground font-semibold uppercase font-stretch-50% underline underline-offset-4 decoration-red-700/75">
          {t("noActiveWorkoutTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("noActiveWorkout")}
        </p>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        <div className="mt-4">
          <Button
            variant="default"
            className="w-full md:w-auto bg-red-700 hover:bg-red-800"
            onClick={createWorkout}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : t("startButton")}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <h1 className="mt-4 mb-2 text-xl font-semibold uppercase font-stretch-50% underline underline-offset-4 decoration-red-700">
        {t("title")}
      </h1>
      <div className="p-4 border rounded-lg ">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex-1">
            <h2 className="text-xl">
              <span className="font-semibold">{t("NameLabel")} </span>
              {activeWorkout.title.length > 50
                ? activeWorkout.title.slice(0, 45) + "..."
                : activeWorkout.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-muted-foreground">{t("DateLabel")} </span>
                <TimerWorkout createdAt={activeWorkout.createdAt} />
              </div>
              <div>
                <span className="text-muted-foreground">
                  {t("ExercisesLabel")}{" "}
                </span>
                <span className="text-sm font-medium">
                  {activeWorkout.workoutExercises
                    ? activeWorkout.workoutExercises.length
                    : 0}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Link href={`/workouts/active`}>
              <Button
                variant="default"
                className="bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 hover:bg-red-800 text-white"
              >
                {t("continueButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveWorkoutCard;
