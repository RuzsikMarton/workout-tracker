import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest , { params }: { params: { slug: string } }) {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session?.user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { slug } = params;
        slug.trim();

        const exercise = await prisma.exercise.findUnique({
            where: { name: slug },
        });

        if (!exercise) {
            return new Response(JSON.stringify({ error: "Exercise not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(exercise), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
}