import { z } from "zod";

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
      .min(3, { error: "MUST_BE_AT_LEAST_3_CHARACTERS" })
      .max(50, { error: "MUST_BE_LESS_THAN_50_CHARACTERS" }),
    email: z.email({ error: "INVALID_EMAIL_ADDRESS" }),
    password: z
      .string()
      .min(8, { error: "MUST_BE_AT_LEAST_8_CHARACTERS" })
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
      .min(8, { error: "MUST_BE_AT_LEAST_8_CHARACTERS" })
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
