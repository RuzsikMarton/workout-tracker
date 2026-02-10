"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type ActionResult = { ok: true } | { ok: false; message: string };

async function requireAdmin(): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return { ok: false, message: "Unauthorized" };
  if (session.role !== "ADMIN") return { ok: false, message: "Forbidden" };

  return { ok: true };
}

type Role = "USER" | "ADMIN";

export async function updateUserRolesAdmin(
  updates: Array<{ userId: string; newRole: Role }>,
) {
  await requireAdmin();

  if (!Array.isArray(updates) || updates.length === 0) {
    throw new Error(
      "Invalid updates format. Expected array of {userId, newRole}",
    );
  }

  for (const u of updates) {
    if (!u?.userId || !u?.newRole) {
      throw new Error("Invalid update: missing userId or newRole.");
    }
    if (u.newRole !== "USER" && u.newRole !== "ADMIN") {
      throw new Error(`Invalid role: ${u.newRole}`);
    }
  }

  try {
    const results = await prisma.$transaction(
      updates.map(({ userId, newRole }) =>
        prisma.user.update({
          where: { id: userId },
          data: { role: newRole },
        }),
      ),
    );

    revalidatePath("/admin/users");
    return { ok: true as const, updated: results.length };
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(err.message);
    }
    if (err instanceof Error) throw err;
    throw new Error("Internal Server Error");
  }
}

export async function deleteUsersAdmin(userIds: string[]) {
  await requireAdmin();

  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error("Invalid userIds format. Expected array of user IDs.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      const adminCount = await tx.user.count({
        where: { id: { in: userIds }, role: "ADMIN" },
      });

      if (adminCount > 0) {
        const totalAdmins = await tx.user.count({ where: { role: "ADMIN" } });
        if (totalAdmins - adminCount < 1) {
          throw new Error(
            "Cannot delete all admin users. At least one admin must remain.",
          );
        }
      }

      await tx.user.deleteMany({ where: { id: { in: userIds } } });
    });

    revalidatePath("/admin/users");
    return { ok: true as const };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(err.message);
    }
    throw err instanceof Error ? err : new Error("Internal Server Error");
  }
}
