"use client";

import { Button } from "@/components/ui/button";
import TimerWorkout from "../TimerWorkout";
import { ArrowBigLeft, SaveAll, SquarePen } from "lucide-react";
import { redirect } from "next/navigation";

const ActiveWorkoutHeader = ({ activeWorkout }: { activeWorkout: any }) => {
  return (
    <div className="bg-section-bg px-4 md:px-16 lg:px-32 py-4 space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
        <Button variant="outline" onClick={() => redirect("/workouts")}>
          <ArrowBigLeft className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">← Back</span>
        </Button>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Workout name"
            value={activeWorkout.title}
            className="w-full border-b-2 pl-3 pr-10 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:rounded-md focus:ring-ring"
          />
          <SquarePen className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button
          variant="outline"
          className="bg-red-700/75 dark:bg-red-800/50 dark:hover:bg-red-700 hover:bg-red-800 text-white hover:text-white"
        >
          <SaveAll className="h-4 w-4 sm:hidden" />
          <span className="hidden sm:inline">Finish Workout</span>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 py-2">
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">Duration</p>
          <TimerWorkout createdAt={activeWorkout.createdAt} />
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">Volume</p>
          <p className="text-lg font-semibold">0 kg</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-xs text-muted-foreground uppercase">Exercises</p>
          <p className="text-lg font-semibold">
            {activeWorkout?.workoutExercises?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkoutHeader;
