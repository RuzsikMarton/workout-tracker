import z from "zod";

export const editUserSchema = z.object({
  name: z
    .string()
    .min(3, { error: "MUST_BE_AT_LEAST_3_CHARACTERS" })
    .max(50, { error: "MUST_BE_LESS_THAN_50_CHARACTERS" }),
  email: z.email({ error: "INVALID_EMAIL_ADDRESS" }),
});

export type EditUserInput = z.infer<typeof editUserSchema>;
