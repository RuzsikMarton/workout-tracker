"use server";

import { auth } from "@/lib/auth";
import {
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from "@/lib/validations";
import { headers } from "next/headers";

export type AuthActionResult = { ok: true } | { ok: false; code: string };

export async function signUpAction(
  formData: SignUpInput,
): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, code: "INVALID_INPUT" };
  }

  const { email, password, name } = parsed.data;

  try {
    await auth.api.signUpEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
        name,
      },
    });

    // if (result && typeof result === "object" && "error" in result) {
    //   console.error("Sign-up error:", result.error);
    //   return {
    //     ok: false,
    //     code: "SIGNUP_FAILED",
    //   };
    // }

    return { ok: true };
  } catch (error: unknown) {
    console.error("Sign-up error:", error);
    if (
      error &&
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      error.statusCode === 401
    ) {
      return { ok: false, code: "SIGNUP_FAILED" };
    }
    return { ok: false, code: "SIGNUP_FAILED_GENERIC" };
  }
}

export async function signInAction(
  formData: SignInInput,
): Promise<AuthActionResult> {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, code: "INVALID_INPUT" };
  }

  const { email, password } = parsed.data;

  try {
    await auth.api.signInEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
      },
    });

    return { ok: true };
  } catch (error: unknown) {
    console.error("Sign-in error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      error.statusCode === 401
    ) {
      return { ok: false, code: "SIGNIN_FAILED" };
    }
    return { ok: false, code: "SIGNIN_FAILED_GENERIC" };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
