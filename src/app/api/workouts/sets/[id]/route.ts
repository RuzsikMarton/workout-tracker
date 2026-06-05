import { recomputeStatsforExercise } from "@/lib/actions/exercise-set";
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

    const { id: setId } = await params;

    const result = await prisma.$transaction(async (tx) => {
      const existingSet = await tx.exerciseSet.findFirst({
        where: {
          id: setId,
          workoutExercise: {
            workout: {
              userId: session.user.id,
            },
          },
        },
        select: {
          id: true,
          workoutExercise: {
            select: {
              id: true,
              exerciseId: true,
              workout: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!existingSet) {
        throw new NotFoundError("Set not found");
      }

      const workoutId = existingSet.workoutExercise.workout.id;
      const workoutStatus = existingSet.workoutExercise.workout.status;

      await tx.exerciseSet.delete({
        where: { id: setId },
      });

      const remaining = await tx.exerciseSet.findMany({
        where: { workoutExerciseId: existingSet.workoutExercise.id },
        orderBy: { setNumber: "asc" },
        select: { id: true },
      });

      await Promise.all(
        remaining.map((set, index) =>
          tx.exerciseSet.update({
            where: { id: set.id },
            data: { setNumber: index + 1 },
          }),
        ),
      );

      if (existingSet.workoutExercise.workout.status === "COMPLETED") {
        await recomputeStatsforExercise(
          tx,
          session.user.id,
          existingSet.workoutExercise.exerciseId,
        );
      }
      return {
        workoutStatus,
        workoutId,
      };
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete set:", error);
    if (error instanceof NotFoundError) {
      return new Response(JSON.stringify({ error: "Set not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to delete set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: setId } = await params;
    const body = await request.json();

    const data = {
      reps: typeof body.reps === "number" ? body.reps : undefined,
      weight: typeof body.weight === "number" ? body.weight : undefined,
    };

    await prisma.$transaction(async (tx) => {
      // Verify ownership
      const existingSet = await tx.exerciseSet.findFirst({
        where: {
          id: setId,
          workoutExercise: {
            workout: {
              userId: session.user.id,
            },
          },
        },
        select: {
          id: true,
          workoutExercise: {
            select: {
              id: true,
              exerciseId: true,
              workout: {
                select: {
                  id: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!existingSet) {
        throw new NotFoundError("Set not found");
      }

      const workoutId = existingSet.workoutExercise.workout.id;
      const workoutStatus = existingSet.workoutExercise.workout.status;

      await tx.exerciseSet.update({
        where: { id: setId },
        data,
      });

      if (existingSet.workoutExercise.workout.status === "COMPLETED") {
        await recomputeStatsforExercise(
          tx,
          session.user.id,
          existingSet.workoutExercise.exerciseId,
        );
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to update set:", error);
    if (error instanceof NotFoundError) {
      return new Response(JSON.stringify({ error: "Set not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Failed to update set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
