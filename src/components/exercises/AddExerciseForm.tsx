"use client";

import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { CreateExerciseData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { exerciseSchema } from "@/lib/validations";

const MUSCLE_GROUPS = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "abs",
  "legs",
];

const EQUIPMENT_OPTIONS = [
  "bodyweight",
  "dumbbell",
  "barbell",
  "bench",
  "kettlebell",
  "machine",
  "pull-up-bar",
  "cable",
  "none",
];

const AddExerciseForm = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CreateExerciseData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      muscleGroup: [],
      equipment: [],
    },
  });

  const onSubmit = async (data: CreateExerciseData) => {
    clearErrors();
    console.log("Submitting data:", data);
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Exercise</h1>

      {errors.root && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md mb-4">
          {errors.root.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Exercise Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Exercise Name *
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g., bench-press"
            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.name && (
            <p className="text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Muscle Groups */}
        <div className="flex flex-col gap-2">
          <label htmlFor="muscleGroup" className="text-sm font-medium">
            Muscle Groups *
          </label>
          <Controller
            name="muscleGroup"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={MUSCLE_GROUPS}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select muscle groups..."
              />
            )}
          />
          <p className="text-xs text-muted-foreground">
            Select all muscle groups this exercise targets
          </p>
          {errors.muscleGroup && (
            <p className="text-destructive mt-1">
              {errors.muscleGroup.message}
            </p>
          )}
        </div>

        {/* Equipment */}
        <div className="flex flex-col gap-2">
          <label htmlFor="equipment" className="text-sm font-medium">
            Equipment *
          </label>
          <Controller
            name="equipment"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={EQUIPMENT_OPTIONS}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select equipment..."
              />
            )}
          />
          <p className="text-xs text-muted-foreground">
            Select all equipment needed for this exercise
          </p>
          {errors.equipment && (
            <p className="text-destructive mt-1">{errors.equipment.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <label htmlFor="imgUrl" className="text-sm font-medium">
            Image URL (optional)
          </label>
          <input
            type="url"
            {...register("imgUrl")}
            placeholder="https://example.com/exercise-image.jpg"
            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.imgUrl && (
            <p className="text-destructive mt-1">{errors.imgUrl.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Creating..." : "Create Exercise"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseForm;
