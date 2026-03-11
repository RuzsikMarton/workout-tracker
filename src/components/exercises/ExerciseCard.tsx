"use client";

import { Exercise } from "@/types";
import { Button } from "../ui/button";
import { Info, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { createWorkoutExerciseAction } from "@/lib/actions/workouts";
import { toast } from "sonner";
import { useState } from "react";

const ExerciseCard = ({
  exercise,
  canAddToWorkout,
}: {
  exercise: Exercise;
  canAddToWorkout: boolean;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const tExercise = useTranslations(exercise.name);
  const tError = useTranslations("errors.codes");
  const tCard = useTranslations("ExerciseCard");
  const tMuscle = useTranslations("muscleGroups");
  const tEquipment = useTranslations("equipment");

  const handleAddToWorkout = async () => {
    setIsAdding(true);
    try {
      const res = await createWorkoutExerciseAction([exercise.id]);
      if (res.ok) {
        toast.success(tCard("toastAdded"));
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
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] sm:gap-16 gap-4 items-center px-4 w-full lg:w-4/5 mx-auto py-4 border-b">
      <div className="min-w-0">
        <Link href={`/exercises/${exercise.name}`}>
          <p className="text-lg font-semibold text-red-700 uppercase font-stretch-50%">
            {tExercise("name")}
          </p>
        </Link>
        <p className="text-sm text-muted-foreground">
          {tCard("muscle")}{" "}
          <span className="text-primary font-medium">
            {exercise.muscleGroup.map((muscle) => tMuscle(muscle)).join(", ")}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          {tCard("equipment")}{" "}
          <span className="text-primary font-medium">
            {exercise.equipment.map((equip) => tEquipment(equip)).join(", ")}
          </span>
        </p>
      </div>
      {exercise.imgUrl && (
        <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
          <Image
            src={exercise.imgUrl}
            alt={tExercise("name")}
            fill
            className="rounded-md object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="flex gap-2 shrink-0">
        <Link href={`/exercises/${exercise.name}`}>
          <Button
            variant="outline"
            className="h-10 w-30 rounded-md cursor-pointer"
          >
            <Info /> {tCard("details")}
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-10 w-30 rounded-md border-red-700 dark:border-red-700 hover:bg-red-700/10 dark:hover:bg-red-700/10 cursor-pointer"
          disabled={!canAddToWorkout || isAdding}
          onClick={handleAddToWorkout}
        >
          {isAdding ? tCard("adding") : tCard("add")}
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCard;
