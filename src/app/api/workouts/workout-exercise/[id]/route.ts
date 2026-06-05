import { recomputeStatsForExercises } from "@/lib/actions/workouts";
import { requireSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

class NotFoundError extends Error {}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: workoutExerciseId } = await params;
    await prisma.$transaction(async (tx) => {
      const workoutExercise = await tx.workoutExercise.findFirst({
        where: {
          id: workoutExerciseId,
          workout: {
            userId: session.user.id,
          },
        },
        include: {
          workout: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });

      if (!workoutExercise) {
        throw new NotFoundError("Workout exercise not found");
      }

      const workoutId = workoutExercise.workoutId;
      const workoutStatus = workoutExercise.workout.status;

      await tx.workoutExercise.delete({
        where: {
          id: workoutExerciseId,
        },
      });

      if (workoutStatus === "COMPLETED") {
        await recomputeStatsForExercises(
          tx,
          session.user.id,
          new Set([workoutExercise.exerciseId]),
        );
      }
      const remaining = await tx.workoutExercise.findMany({
        where: {
          workoutId: workoutId,
        },
        orderBy: { order: "asc" },
        select: { id: true },
      });

      await Promise.all(
        remaining.map((exercise, index) =>
          tx.workoutExercise.update({
            where: { id: exercise.id },
            data: { order: index + 1 },
          }),
        ),
      );
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete workout exercise:", error);
    if (error instanceof NotFoundError) {
      return new Response(
        JSON.stringify({ error: "Workout exercise not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }
    return new Response(
      JSON.stringify({ error: "Failed to delete workout exercise" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
