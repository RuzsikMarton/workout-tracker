"use server";

import { prisma } from "@/lib/prisma";
import { exerciseSchema } from "@/lib/validations";
import { CreateExerciseData } from "@/types/exercises";
import { isAdmin } from "@/lib/user-role";

export type AddExerciseResult = { ok: true } | { ok: false; message: string };

export async function createExerciseAction(formData: CreateExerciseData): Promise<AddExerciseResult> {
    
    const admin = await isAdmin();
    if (!admin) {
        return { ok: false, message: "Access denied. Admins only." };
    }

    const parsed = exerciseSchema.safeParse(formData);

    if (!parsed.success) {
        return { ok: false, message: "Invalid input data." };
    }

    try {
        const res = await prisma.exercise.create({
            data: {
                name: parsed.data.name,
                muscleGroup: parsed.data.muscleGroup,
                equipment: parsed.data.equipment,
                imgUrl: parsed.data.imgUrl,
            },
        })

        if ((res as any)?.error) {
            return { ok: false, message: (res as any).error.message ?? "Failed to create exercise." };
        }
        return { ok: true };
    } catch (error: any) {
        const errorMessage = error?.message || "Failed to create exercise. Please try again.";
        return { ok: false, message: errorMessage };
    }
}