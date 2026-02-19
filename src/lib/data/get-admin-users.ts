import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { requireRole } from "../user-role";

export async function getUsersAdmin(params: {
  search: string;
  page: number;
  pageSize: number;
}) {
  await requireRole("ADMIN");
  const { search, page, pageSize } = params;

  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, totalCount };
}
