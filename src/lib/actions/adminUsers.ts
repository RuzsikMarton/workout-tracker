"use server";

import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth-helpers";

export type ActionResult = { ok: true } | { ok: false; message: string };

type Role = "USER" | "ADMIN";

export async function updateUserRolesAdmin(
  updates: Array<{ userId: string; newRole: Role }>,
) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin;

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

  // Check if trying to change own role to USER
  const changingSelfToUser = updates.some(
    (u) => u.userId === admin.id && u.newRole === "USER",
  );
  if (changingSelfToUser) {
    throw new Error("You cannot change your own role to USER.");
  }

  try {
    const results = await prisma.$transaction(async (tx) => {
      // Check if changing admins to users
      const adminToUserChanges = updates.filter((u) => u.newRole === "USER");

      if (adminToUserChanges.length > 0) {
        const affectedUserIds = adminToUserChanges.map((u) => u.userId);
        const adminsBeingChanged = await tx.user.count({
          where: { id: { in: affectedUserIds }, role: "ADMIN" },
        });

        if (adminsBeingChanged > 0) {
          const totalAdmins = await tx.user.count({ where: { role: "ADMIN" } });
          if (totalAdmins - adminsBeingChanged < 1) {
            throw new Error(
              "Cannot change the last admin to USER. At least one admin must remain.",
            );
          }
        }
      }

      // Perform the updates
      return Promise.all(
        updates.map(({ userId, newRole }) =>
          tx.user.update({
            where: { id: userId },
            data: { role: newRole },
          }),
        ),
      );
    });

    revalidatePath("/admin/users");
    return { ok: true as const, updated: results.length };
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error updating user roles:", err);
    }
    if (err instanceof Error) throw err;
    throw new Error("Internal Server Error");
  }
}

export async function deleteUsersAdmin(userIds: string[]) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin;

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
      console.error("Prisma error deleting users:", err);
    }
    throw err instanceof Error ? err : new Error("Internal Server Error");
  }
}
