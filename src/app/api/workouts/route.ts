import { requireSession } from "@/lib/auth-helpers";
import { getWorkoutHistory } from "@/lib/data/get-workout";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await requireSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "15");

    const res = await getWorkoutHistory({
      userId: session.user.id,
      page: page,
      pageSize: pageSize,
    });

    return new Response(
      JSON.stringify({
        data: res,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching workout history:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch workout history",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST() {
  try {
    const session = await requireSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workout = await prisma.workout.create({
      data: {
        title: Date.now().toString(),
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        data: workout,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error creating workout:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create workout",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
