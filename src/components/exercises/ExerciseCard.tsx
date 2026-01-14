"use client";

import { Exercise } from "@/types";
import { Button } from "../ui/button";
import { Info, Plus } from "lucide-react";
import Link from "next/link";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-4 px-4 w-full lg:w-4/5 mx-auto py-4 justify-between gap-4 border-b">
      <div>
        <p className="text-lg font-semibold text-red-700 uppercase font-stretch-50%">
          {exercise.name}
        </p>
        <p className="text-sm text-muted-foreground">
          Muscle group:{" "}
          <span className="text-primary font-medium">
            {exercise.muscleGroup.join(", ")}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Equipment:{" "}
          <span className="text-primary font-medium">
            {exercise.equipment.join(", ")}
          </span>
        </p>
      </div>
      <div>{/* Placeholder for an image or illustration */}</div>
      <div className="flex gap-2">
        <Link href={`/exercises/${exercise.id}`}>
          <Button variant="outline" className="h-10 w-30 rounded-md">
            <Info /> Details
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-10 w-30 rounded-md border-red-700 dark:border-red-700 hover:bg-red-700/10 dark:hover:bg-red-700/10"
        >
          Add
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCard;
