"use client";

import { Button } from "@/components/ui/button";
import { WorkoutExerciseWithData } from "@/types";
import { Check, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SelectedExerciseSet from "./SelectedExerciseSet";

const SelectedExerciseCard = ({
  workoutExercise,
}: {
  workoutExercise: WorkoutExerciseWithData;
}) => {
  const tE = useTranslations(workoutExercise.exercise.name);
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-4 pb-4">
        <div className="shrink-0 p-2 rounded-full bg-muted-foreground/25">
          <Image
            src={workoutExercise.exercise?.imgUrl || "/logo.webp"}
            alt={"Exercise image"}
            width={48}
            height={48}
          />
        </div>
        <span className="uppercase text-primary/90 text-sm md:text-lg font-medium flex-1 min-w-0">
          {tE("name")}
        </span>
        <Button variant="outline" size="sm" className="shrink-0">
          ...
        </Button>
        <Button variant="outline" size="sm" className="shrink-0">
          <X className="h-4 w-4 md:hidden" />
          <span className="hidden md:inline">Remove Exercise</span>
        </Button>
      </div>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-4 border-b">
          <span className="text-sm text-muted-foreground">Set </span>
          <span className="text-sm text-muted-foreground">Kg</span>
          <span className="ml-4 text-sm text-muted-foreground">Reps</span>
          <div className="ml-4 flex justify-end items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4" />
            <X className="h-4 w-4" />
          </div>
        </div>
        {workoutExercise.sets.map((set, index) => (
          <SelectedExerciseSet
            key={set.id}
            set={set}
            setIndex={index}
            workoutExerciseId={workoutExercise.id}
          />
        ))}
        <button className="group mt-4 w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 hover:border-muted-foreground/50 transition-all duration-200 py-3 px-4 flex items-center justify-center gap-2">
          <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Add Set
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectedExerciseCard;
