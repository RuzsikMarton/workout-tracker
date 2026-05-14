import { z } from "zod";
import { VALIDATION_LIMITS } from "@/const";

// Sign in validation schema
export const signInSchema = z.object({
  email: z.email({ error: "INVALID_EMAIL_ADDRESS" }),
  password: z.string().min(8, { error: "MUST_BE_AT_LEAST_8_CHARACTERS" }),
});

// Sign up validation schema
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(VALIDATION_LIMITS.NAME_MIN_LENGTH, {
        error: `MUST_BE_AT_LEAST_${VALIDATION_LIMITS.NAME_MIN_LENGTH}_CHARACTERS`,
      })
      .max(VALIDATION_LIMITS.NAME_MAX_LENGTH, {
        error: `MUST_BE_LESS_THAN_${VALIDATION_LIMITS.NAME_MAX_LENGTH}_CHARACTERS`,
      }),
    email: z.email({ error: "INVALID_EMAIL_ADDRESS" }),
    password: z
      .string()
      .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, {
        error: `MUST_BE_AT_LEAST_${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH}_CHARACTERS`,
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        error: "PASSWORD_MUST_CONTAIN_UPPERCASE_LOWERCASE_NUMBER",
      }),
    confirmPassword: z
      .string()
      .min(1, { error: "PLEASE_CONFIRM_YOUR_PASSWORD" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORDS_DONT_MATCH",
    path: ["confirmPassword"],
  });

// Infer TypeScript types from Zod schemas
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.email({ error: "INVALID_EMAIL_ADDRESS" }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(VALIDATION_LIMITS.PASSWORD_MIN_LENGTH, {
        error: `MUST_BE_AT_LEAST_${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH}_CHARACTERS`,
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        error: "PASSWORD_MUST_CONTAIN_UPPERCASE_LOWERCASE_NUMBER",
      }),
    confirmPassword: z
      .string()
      .min(1, { error: "PLEASE_CONFIRM_YOUR_PASSWORD" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORDS_DONT_MATCH",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
