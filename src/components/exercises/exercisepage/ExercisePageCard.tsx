"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createWorkoutExerciseAction } from "@/lib/actions/workouts";
import { useActiveWorkoutStore } from "@/lib/stores/active-workout-store";
import { useSession } from "@/lib/client";
import { useState } from "react";
import { Exercise } from "@prisma/client";

const ExercisePageCard = ({ exercise }: { exercise: Exercise }) => {
  const t = useTranslations(exercise.name);
  const tError = useTranslations("errors.codes");
  const tMuscle = useTranslations("muscleGroups");
  const tEquipment = useTranslations("equipment");
  const tPage = useTranslations("ExercisePage");

  const workoutId = useActiveWorkoutStore((state) => state.workoutId);
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isAdding, setIsAdding] = useState(false);

  const canAddToWorkout = !!workoutId && !!session;
  const isButtonDisabled = !canAddToWorkout || isAdding || isSessionLoading;

  const handleAddToWorkout = async () => {
    if (!workoutId) return;

    setIsAdding(true);
    try {
      const res = await createWorkoutExerciseAction(workoutId, [exercise.id]);
      if (res.ok) {
        toast.success(tPage("toastAdded"));
      } else {
        toast.error(tError("FAILED_TO_ADD_EXERCISES_TO_WORKOUT"));
      }
    } catch (error) {
      toast.error(tError("FAILED_TO_ADD_EXERCISES_TO_WORKOUT"));
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="block py-8 lg:py-16 bg-header-bg">
          <div className="w-4/5 mx-auto lg:max-w-5xl">
            <span className="text-white uppercase text-4xl lg:text-5xl font-medium font-stretch-50% underline underline-offset-4 decoration-red-700">
              {t("name")}
            </span>
            <p className="text-sm mt-1 text-muted-foreground">
              {exercise.muscleGroup.map((muscle) => tMuscle(muscle)).join(", ")}{" "}
              -{" "}
              {exercise.equipment.map((equip) => tEquipment(equip)).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/*Left column*/}
          <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={exercise.imgUrl || "/logo.webp"}
                alt={tPage("imgAlt")}
                fill
                className="rounded-md object-cover"
                unoptimized={exercise.imgUrl ? true : false}
                priority
              />
            </div>
            <div className="lg:hidden">
              <Button
                variant="default"
                className="w-full text-sm font-medium text-primary-foreground"
                onClick={handleAddToWorkout}
                disabled={isButtonDisabled}
              >
                {isAdding ? tPage("buttonAdding") : tPage("button")}
              </Button>
            </div>
          </div>
          {/*Right column*/}
          <div className="space-y-6">
            <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-4">
              {/* Muscle */}
              <div className="rounded-xl border bg-background/60 dark:bg-background/35 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between border-b pb-2 bg-secondary dark:bg-background/25 -mx-4 px-4 -mt-4 pt-4 rounded-t-xl">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {tPage("muscleLabel")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exercise.muscleGroup.map((muscle) => (
                    <span
                      key={muscle}
                      className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
                    >
                      {tMuscle(muscle)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="rounded-xl border bg-background/60 dark:bg-background/35 p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between border-b pb-2 bg-secondary dark:bg-background/25 -mx-4 px-4 -mt-4 pt-4 rounded-t-xl">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    {tPage("equipmentLabel")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exercise.equipment.map((equip) => (
                    <span
                      key={equip}
                      className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium"
                    >
                      {tEquipment(equip)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-base md:text-sm uppercase tracking-wide text-muted-foreground">
                {tPage("descriptionLabel")}
              </span>
              <p className="text-base leading-relaxed text-foreground/90">
                {t("description")}
              </p>
            </div>

            <div className="hidden lg:block">
              <Button
                variant="default"
                className="w-full text-sm font-medium text-primary-foreground"
                onClick={handleAddToWorkout}
                disabled={isButtonDisabled}
              >
                {isAdding ? tPage("buttonAdding") : tPage("button")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisePageCard;
