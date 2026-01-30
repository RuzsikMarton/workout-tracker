import { prisma } from "@/lib/prisma";
import { isAdminFromHeaders } from "@/lib/user-role";
import { Prisma } from "@prisma/client";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (!(await isAdminFromHeaders(req.headers))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }


    const params = req.nextUrl.searchParams;
    const search = params.get("search") || "";
    const page = parseInt(params.get("page") || "1");
    const pageSize = parseInt(params.get("pageSize") || "10");
    
    const where: Prisma.UserWhereInput = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {};
        try {
            const users = await prisma.user.findMany({
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
            });
    
            const totalCount = await prisma.user.count({ where });
    
            return NextResponse.json({
                data: users,
                totalCount,
            }, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } catch (err : any) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return NextResponse.json({ error: err.message }, { status: 400 });
            }
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
}

export async function PATCH(req: NextRequest) {
    if (!(await isAdminFromHeaders(req.headers))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

    try {
        const body = await req.json();
        const { updates } = body as { updates: Array<{ userId: string; newRole: "USER" | "ADMIN" }> };

        if (!updates || !Array.isArray(updates) || updates.length === 0) {
            return NextResponse.json({ error: "Invalid updates format. Expected array of {userId, newRole}" }, {
                status: 400,
            });
        }
        for (const update of updates) {
            if (!update.userId || !update.newRole) {
                return NextResponse.json({ 
                    error: `Invalid update: missing userId or newRole` 
                }, { status: 400 });
            }
            if (!["USER", "ADMIN"].includes(update.newRole)) {
                return NextResponse.json({ 
                    error: `Invalid role: ${update.newRole}` 
                }, { status: 400 });
            }
        }
        const results = await prisma.$transaction(
            updates.map(({ userId, newRole }) =>
                prisma.user.update({
                    where: { id: userId },
                    data: { role: newRole },
                })
            )
        );

        return NextResponse.json({ 
            data: results,
            updated: results.length 
        }, { status: 200 });
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!(await isAdminFromHeaders(req.headers))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

    try {
        const body = await req.json();
        const { userIds } = body as { userIds: string[] };
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return NextResponse.json({ error: "Invalid userIds format. Expected array of user IDs." }, {
                status: 400,
            });
        }

        const results = await prisma.$transaction(async (tx) => {
            const adminCount = await tx.user.count({
                where: { id: { in: userIds }, role: "ADMIN" },
            })
            if (adminCount > 0) {
                const totalAdmins = await tx.user.count({ where: { role: "ADMIN" } });
                if (totalAdmins - adminCount < 1) {
                    throw new Error("Cannot delete all admin users. At least one admin must remain.");
                }
            }
            return tx.user.deleteMany({
                where: { id: { in: userIds } },
            });
        });
        return NextResponse.json({ 
            message : "Users deleted successfully"
        }, { status: 200 });
    } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}