import { requireSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { workoutExerciseId } = await request.json();

    const exercise = await prisma.workoutExercise.findFirst({
      where: {
        id: workoutExerciseId,
        workout: { userId: session.user.id },
      },
      include: {
        sets: {
          select: {
            setNumber: true,
          },
          orderBy: {
            setNumber: "desc",
          },
          take: 1,
        },
      },
    });
    if (!exercise) {
      return Response.json(
        { error: "Workout exercise not found" },
        { status: 404 },
      );
    }

    const lastSetNumber = exercise.sets[0]?.setNumber ?? 0;
    await prisma.exerciseSet.create({
      data: {
        workoutExerciseId: workoutExerciseId,
        setNumber: lastSetNumber + 1,
        reps: 0,
        weight: 0,
      },
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    console.error("Failed to create set:", error);
    return new Response(JSON.stringify({ error: "Failed to create set" }), {
      status: 500,
    });
  }
}
