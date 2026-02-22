"use server";

import { prisma } from "@/lib/prisma";
import { exerciseSchema } from "@/lib/validations";
import { CreateExerciseData } from "@/types/exercises";
import { isAdmin } from "@/lib/user-role";

export type AddExerciseResult = { ok: true } | { ok: false; code: string };

export async function createExerciseAction(
  formData: CreateExerciseData,
): Promise<AddExerciseResult> {
  const admin = await isAdmin();
  if (!admin) {
    return { ok: false, code: "ACCESS_DENIED" };
  }

  const parsed = exerciseSchema.safeParse(formData);

  if (!parsed.success) {
    return { ok: false, code: "INVALID_INPUT" };
  }

  try {
    const res = await prisma.exercise.create({
      data: {
        name: parsed.data.name,
        muscleGroup: parsed.data.muscleGroup,
        equipment: parsed.data.equipment,
        imgUrl: parsed.data.imgUrl,
      },
    });

    if ((res as { error?: { message?: string } })?.error) {
      return {
        ok: false,
        code: (res as any).error.message ?? "FAILED_TO_CREATE_EXERCISE",
      };
    }
    return { ok: true };
  } catch (error: unknown) {
    console.error("Error creating exercise:", error);
    return { ok: false, code: "FAILED_TO_CREATE_EXERCISE" };
  }
}
