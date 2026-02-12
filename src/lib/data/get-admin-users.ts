import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function getUsersAdmin(params: {
  search: string;
  page: number;
  pageSize: number;
}) {
  try {
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
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, totalCount };
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(err.message);
    }
    throw new Error("Failed to fetch users");
  }
}
