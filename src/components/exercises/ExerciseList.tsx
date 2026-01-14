import { AlertTriangle, SearchX } from "lucide-react";
import ExerciseSkeleton from "./ExerciseSkeleton";
import ExereciseCard from "./ExerciseCard";

const items = [
  {
    id: "1",
    name: "Push Up",
    muscleGroup: ["Chest"],
    equipment: ["Bodyweight"],
  },
  {
    id: "2",
    name: "Squat",
    muscleGroup: ["Legs"],
    equipment: ["Bodyweight"],
  },
  {
    id: "3",
    name: "Bench Press",
    muscleGroup: ["Chest"],
    equipment: ["Barbell"],
  },
];

const ExerciseList = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <ExerciseSkeleton />
      </div>
    );
  }
  if (error) {
    <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
      <AlertTriangle className="mx-auto mb-4 h-6 w-6 text-red-700 dark:text-red-500" />
      <p className="font-medium">Something went wrong</p>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn’t load exercises. Please try again.
      </p>
    </div>;
  }

  if (!items?.length) {
    return (
      <div className="w-4/5 mx-auto mt-4 rounded-xl border p-6 text-center">
        <SearchX className="mx-auto mb-4 h-6 w-6 text-red-700 dark:text-red-500" />
        <p className="font-medium">No exercises found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {items.map((exercise) => (
        <ExereciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
};

export default ExerciseList;
