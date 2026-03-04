"use client";

import { Exercise, ExerciseSet } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const WorkoutDetailsCard = ({
  exercise,
  sets,
}: {
  exercise: Exercise;
  sets: ExerciseSet[];
}) => {
  const tExercise = useTranslations(exercise.name);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-4 border-b ">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 p-2 relative rounded-full bg-muted-foreground/50 overflow-hidden">
          <Image
            src={exercise.imgUrl || "/logo.webp"}
            alt={tExercise("name")}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl text-primary/80 font-semibold">
          {tExercise("name")}
        </h3>
      </div>
      <div>
        <div className="grid grid-cols-3">
          <span className="uppercase text-muted-foreground">Set </span>
          <span className="uppercase text-muted-foreground">Reps </span>
          <span className="uppercase text-muted-foreground">Weight</span>
        </div>
        {sets.map((set) => (
          <div key={set.id} className="grid grid-cols-3 py-2">
            <span>{set.setNumber}</span>
            <span>{set.reps}</span>
            <span>{set.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetailsCard;
