import z from "zod";

export const exerciseSchema = z.object({
    name: z.string().min(1, "Exercise name is required").max(100, "Exercise name is too long"),
    muscleGroup: z.array(z.string()).min(1, "At least one muscle group must be selected"),
    equipment: z.array(z.string()).min(1, "At least one equipment option must be selected"),
    imgUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});