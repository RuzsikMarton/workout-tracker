"use server";

import { EditUserInput, editUserSchema } from "../validations";
import { auth } from "../auth";
import { headers } from "next/headers";

export type UserActionResult = { ok: true } | { ok: false; code: string };

export async function editUserAction(
  currentUser: { name: string; email: string },
  formData: EditUserInput,
): Promise<UserActionResult> {
  const parsed = editUserSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, code: "INVALID_INPUT" };
  }
  const { name, email } = parsed.data;

  const nameChanged = name !== currentUser.name;
  const emailChanged = email !== currentUser.email.toLowerCase();

  try {
    if (nameChanged) {
      await auth.api.updateUser({
        body: { name: name },
        headers: await headers(),
      });
    }
    if (emailChanged) {
      await auth.api.changeEmail({
        body: { newEmail: email },
        headers: await headers(),
      });
    }
    return { ok: true };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    return { ok: false, code: "UPDATE_FAILED" };
  }
}
