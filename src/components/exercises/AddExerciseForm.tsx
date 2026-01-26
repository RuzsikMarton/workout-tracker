"use client";

import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CreateExerciseData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { exerciseSchema } from "@/lib/validations";
import { createExerciseAction } from "@/app/actions/exercises";
import { useState, useRef } from "react";
import { EQUIPMENT_OPTIONS, MUSCLE_GROUPS } from "@/lib/selectdata";

const AddExerciseForm = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateExerciseData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      muscleGroup: [],
      equipment: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "workout-tracker");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error?.message || "Image upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit: SubmitHandler<CreateExerciseData> = async (formData) => {
    clearErrors("root");
    setSuccessMessage(null);

    try {
      // Upload image first if file is selected
      if (selectedFile) {
        setIsUploading(true);
        const imageUrl = await uploadImageToCloudinary(selectedFile);
        formData.imgUrl = imageUrl;
        setIsUploading(false);
      }

      // Create exercise with image URL
      const res = await createExerciseAction(formData);
      if (!res.ok) {
        setError("root", { message: res.message });
        return;
      }

      setSuccessMessage("Exercise created successfully!");
      reset();
      setSelectedFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1500);
    } catch (error) {
      setIsUploading(false);
      setError("root", { message: (error as Error).message });
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6 sm:px-6 min-w-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 wrap-break-words">
        Add New Exercise
      </h1>

      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

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
            className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="imgUrl" className="text-sm font-medium">
            Exercise Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {imagePreview && (
            <div className="mt-2 relative w-full max-w-xs">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md border object-cover w-full h-48"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setImagePreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
          {errors.imgUrl && (
            <p className="text-destructive mt-1">{errors.imgUrl.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="flex-1 w-full"
          >
            {isUploading
              ? "Uploading image..."
              : isSubmitting
                ? "Creating..."
                : "Create Exercise"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting || isUploading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExerciseForm;
