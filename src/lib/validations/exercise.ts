import z from "zod";

export const exerciseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Exercise name is required")
    .max(100, "Exercise name is too long"),
  muscleGroup: z
    .array(z.string())
    .min(1, "At least one muscle group must be selected"),
  equipment: z
    .array(z.string())
    .min(1, "At least one equipment option must be selected"),
  imgUrl: z
    .string()
    .trim()
    .url("Invalid image URL")
    .optional()
    .nullable()
    .or(z.literal("")),
});
