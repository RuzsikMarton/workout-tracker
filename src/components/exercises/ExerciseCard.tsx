"use client";

import { Exercise } from "@/types";
import { Button } from "../ui/button";
import { Info, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const t = useTranslations(exercise.name);
  const tC = useTranslations("ExerciseCard");
  const tMuscle = useTranslations("muscleGroups");
  const tEquipment = useTranslations("equipment");
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-4 px-4 w-full lg:w-4/5 mx-auto py-4 justify-between gap-4 border-b">
      <div>
        <p className="text-lg font-semibold text-red-700 uppercase font-stretch-50%">
          {t("name")}
        </p>
        <p className="text-sm text-muted-foreground">
          {tC("muscle")}{" "}
          <span className="text-primary font-medium">
            {exercise.muscleGroup.map((muscle) => tMuscle(muscle)).join(", ")}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          {tC("equipment")}{" "}
          <span className="text-primary font-medium">
            {exercise.equipment.map((equip) => tEquipment(equip)).join(", ")}
          </span>
        </p>
      </div>
      <div>{/* Placeholder for an image or illustration */}</div>
      <div className="flex gap-2">
        <Link href={`/exercises/${exercise.id}`}>
          <Button variant="outline" className="h-10 w-30 rounded-md">
            <Info /> {tC("details")}
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-10 w-30 rounded-md border-red-700 dark:border-red-700 hover:bg-red-700/10 dark:hover:bg-red-700/10"
        >
          {tC("add")}
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCard;
