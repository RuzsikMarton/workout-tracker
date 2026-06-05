import { recomputeStatsForExercises } from "@/lib/actions/workouts";
import { requireSession } from "@/lib/auth-helpers";
import { getUserWorkoutById } from "@/lib/data/get-workout";
import { prisma } from "@/lib/prisma";

class NotFoundError extends Error {}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: workoutId } = await params;

    const res = await getUserWorkoutById(workoutId, session.user.id);

    if (!res) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

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
    console.error("Failded to fetch workout:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch workout",
        message:
          error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: workoutId } = await params;

    await prisma.$transaction(async (tx) => {
      const workout = await tx.workout.findFirst({
        where: {
          id: workoutId,
          userId: session.user.id,
        },
        include: {
          workoutExercises: true,
        },
      });

      if (!workout) throw new NotFoundError("Workout not found");

      // find ids of exercises that are being deleted with the workout
      const deletedExerciseIds = [
        ...new Set(workout.workoutExercises.map((we) => we.exerciseId)),
      ];

      const deletedWorkoutExerciseIds = new Set(
        workout.workoutExercises.map((we) => we.id),
      );
      //get user stats for the exercises being deleted
      const userStats = await tx.userExerciseStats.findMany({
        where: {
          userId: session.user.id,
          exerciseId: { in: deletedExerciseIds },
        },
      });

      const statsMap = new Map(
        userStats.map((stat) => [stat.exerciseId, stat]),
      );

      // determine which exercises need to have their stats updated after deletion
      const exercisesToUpdate = new Set<string>();
      for (const exerciseId of deletedExerciseIds) {
        const stats = statsMap.get(exerciseId);
        if (!stats) continue;
        if (
          (stats.lastWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.lastWorkoutExerciseId)) ||
          (stats.heaviestSetWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(
              stats.heaviestSetWorkoutExerciseId,
            )) ||
          (stats.bestVolumeWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.bestVolumeWorkoutExerciseId)) ||
          (stats.bestE1RMWorkoutExerciseId &&
            deletedWorkoutExerciseIds.has(stats.bestE1RMWorkoutExerciseId))
        ) {
          exercisesToUpdate.add(exerciseId);
        }
      }

      await tx.workout.delete({
        where: {
          id: workoutId,
        },
      });

      //recompute stats for affected exercises
      await recomputeStatsForExercises(tx, session.user.id, exercisesToUpdate);
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting workout:", error);
    if (error instanceof NotFoundError) {
      return Response.json(
        { error: "Workout not found" },

        { status: 404 },
      );
    }
    return new Response(
      JSON.stringify({
        error: "Failed to delete workout",
        message:
          error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
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

    const { id: workoutId } = await params;
    const { title } = await request.json();

    const res = await prisma.workout.updateMany({
      where: {
        id: workoutId,
        userId: session.user.id,
      },
      data: {
        title: title.trim(),
      },
    });

    if (res.count === 0) {
      return new Response(
        JSON.stringify({
          error: "Workout not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.error("Error updating workout:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update workout name",
        message:
          error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
