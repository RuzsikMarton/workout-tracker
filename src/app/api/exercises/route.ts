import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
    const searchParams = req.nextUrl.searchParams;
    const equipment = searchParams.get("equipment") || "";
    const muscleGroup = searchParams.get("muscle") || "";
    const orderBy = searchParams.get("sort") || "asc";
    
    // pagination
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (equipment) {
        where.equipment = { has: equipment };
    }
    if (muscleGroup) {
        where.muscleGroup = { has: muscleGroup };
    }
    
    // Get total count for pagination
    const totalCount = await prisma.exercise.count({ where });
    
    // Fetch paginated exercises
    const exercises = await prisma.exercise.findMany({
        where,
        orderBy: {
            name: orderBy === "asc" ? "asc" : "desc",
        },
        skip,
        take: limit,
    });
    
    return new Response(JSON.stringify({
        data: exercises,
        pagination: {
            total: totalCount,
            page,
            pageSize: limit,
            totalPages: Math.ceil(totalCount / limit),
        }
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
} 