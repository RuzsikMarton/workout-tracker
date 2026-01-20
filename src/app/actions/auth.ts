"use server";

import { auth } from "@/lib/auth";
import { SignInInput, signInSchema, SignUpInput, signUpSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthActionResult = { ok: true } | { ok: false; message: string };

export async function signUpAction(formData: SignUpInput): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { email, password, name } = parsed.data;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
        name,
      },
    });

    if ((result as any)?.error) {
      return { ok: false, message: (result as any).error.message ?? "Failed to sign up." };
    }

    return { ok: true };
    
  } catch (error: any) {
    const errorMessage = error?.message || "Failed to sign up. Please try again.";
    return { ok: false, message: errorMessage };
  }
}

export async function signInAction(formData : SignInInput): Promise<AuthActionResult> {
  const parsed = signInSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, message: "Invalid input" };
  }

  const { email, password } = parsed.data;

  try{
    const result = await auth.api.signInEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
      },
    });

    if ((result as any)?.error) {
      return { ok: false, message: (result as any).error.message ?? "Failed to sign in." };
    }

    return { ok: true};
  } catch (error: any) {
    const errorMessage = error?.message || "Failed to sign in. Please try again.";
    return { ok: false, message: errorMessage };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
