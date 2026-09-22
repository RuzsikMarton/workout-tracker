import { VALIDATION_LIMITS } from "@/const";
import z from "zod";

export const editUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(VALIDATION_LIMITS.NAME_MIN_LENGTH, {
      error: `MUST_BE_AT_LEAST_${VALIDATION_LIMITS.NAME_MIN_LENGTH}_CHARACTERS`,
    })
    .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, {
      error: `MUST_BE_LESS_THAN_${VALIDATION_LIMITS.NAME_MAX_LENGTH}_CHARACTERS`,
    }),
  email: z.email({ error: "INVALID_EMAIL_ADDRESS" }).trim(),
});

export type EditUserInput = z.infer<typeof editUserSchema>;
