import { requireSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      workoutId,
      exerciseIds,
    }: { workoutId: string; exerciseIds: string[] } = await request.json();

    const workout = await prisma.workout.findFirst({
      where: {
        userId: session.user.id,
        id: workoutId,
      },
      include: {
        workoutExercises: {
          select: { order: true },
          orderBy: { order: "desc" },
          take: 1,
        },
      },
    });

    if (!workout) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }
    const startOrder = workout.workoutExercises[0]?.order ?? 0;

    await prisma.workoutExercise.createMany({
      data: exerciseIds.map((exerciseId, index) => ({
        workoutId: workout.id,
        exerciseId: exerciseId,
        order: startOrder + index + 1,
      })),
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error("Failed to create workout exercise:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create workout exercise" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
