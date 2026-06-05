import { auth } from "@/lib/auth";
import { getActiveWorkoutWithData } from "@/lib/data/get-workout";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await getActiveWorkoutWithData(session.user.id);

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
    console.error("Error fetching active workout:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch active workout",
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

export async function PATCH() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workout = await prisma.workout.findFirst({
      where: {
        userId: session.user.id,
        status: "IN_PROGRESS",
      },
      include: {
        workoutExercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    if (!workout) {
      return new Response(
        JSON.stringify({ error: "No active workout found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // calculate total volume and duration
    const totalVolume = workout?.workoutExercises.reduce(
      (workoutTotal, exercise) =>
        workoutTotal +
        exercise.sets?.reduce(
          (exerciseTotal, set) => exerciseTotal + set.reps * set.weight,
          0,
        ),
      0,
    );

    let duration = 0;
    if (workout.status === "COMPLETED") {
      duration = workout.duration ?? 0;
    } else {
      duration = Math.floor((Date.now() - workout.createdAt.getTime()) / 1000);
    }

    // fetch existing user exercise stats for all exercises in the workout
    const exerciseIds = [
      ...new Set(workout.workoutExercises.map((we) => we.exerciseId)),
    ];

    // fetch existing stats for these exercises for the user
    const existingUserExerciseStats = await prisma.userExerciseStats.findMany({
      where: {
        userId: session.user.id,
        exerciseId: { in: exerciseIds },
      },
    });

    // create a map of existing stats for easy lookup
    const existingStatsMap = new Map(
      existingUserExerciseStats.map((stat) => [stat.exerciseId, stat]),
    );

    await prisma.$transaction(async (tx) => {
      await prisma.workout.update({
        where: { id: workout.id },
        data: {
          status: "COMPLETED",
          duration,
          totalVolume,
        },
      });

      for (const exercise of workout.workoutExercises) {
        let sessionVolume = 0;
        let topSetWeight: number | null = null;
        let topSetReps: number | null = null;
        let topE1RM: number | null = null;

        for (const set of exercise.sets) {
          const reps = set.reps ?? 0;
          const weight = set.weight ?? 0;
          sessionVolume += reps * weight;

          if (
            topSetWeight === null ||
            weight > topSetWeight ||
            (weight === topSetWeight && reps > (topSetReps ?? 0))
          ) {
            // new top set found
            topSetWeight = weight;
            topSetReps = reps;
          }

          if (weight > 0 && reps > 0) {
            const e1RM = weight * (1 + reps / 30); // Epley formula for 1RM estimation
            if (topE1RM === null || e1RM > topE1RM) {
              topE1RM = e1RM;
            }
          }
        }
        // merging new workout stats with existing stats
        const existingStats = existingStatsMap.get(exercise.exerciseId);
        const shouldUpdate =
          topSetWeight !== null &&
          (!existingStats ||
            existingStats.bestSetWeight === null ||
            topSetWeight > existingStats.bestSetWeight ||
            (topSetWeight === existingStats.bestSetWeight &&
              (topSetReps ?? 0) > (existingStats.bestSetReps ?? 0)));

        const merged = {
          lastPerformed: workout.createdAt,
          lastWorkoutExerciseId: exercise.id,
          bestSetWeight: shouldUpdate
            ? topSetWeight
            : existingStats?.bestSetWeight || null,
          bestSetReps: shouldUpdate
            ? topSetReps
            : existingStats?.bestSetReps || null,
          heaviestSetWorkoutExerciseId: shouldUpdate
            ? exercise.id
            : existingStats?.heaviestSetWorkoutExerciseId || null,
          bestE1RM:
            topE1RM !== null &&
            (!existingStats ||
              existingStats.bestE1RM === null ||
              topE1RM > existingStats.bestE1RM)
              ? topE1RM
              : (existingStats?.bestE1RM ?? null),
          bestE1RMWorkoutExerciseId:
            topE1RM !== null &&
            (!existingStats ||
              existingStats.bestE1RM === null ||
              topE1RM > existingStats.bestE1RM)
              ? exercise.id
              : existingStats?.bestE1RMWorkoutExerciseId || null,
          bestVolume:
            !existingStats ||
            existingStats.bestVolume == null ||
            sessionVolume > existingStats.bestVolume
              ? sessionVolume
              : existingStats.bestVolume,
          bestVolumeWorkoutExerciseId:
            !existingStats ||
            existingStats.bestVolume == null ||
            sessionVolume > existingStats.bestVolume
              ? exercise.id
              : existingStats?.bestVolumeWorkoutExerciseId || null,
        };

        await tx.userExerciseStats.upsert({
          where: {
            userId_exerciseId: {
              userId: session.user.id,
              exerciseId: exercise.exerciseId,
            },
          },
          update: merged,
          create: {
            userId: session.user.id,
            exerciseId: exercise.exerciseId,
            ...merged,
          },
        });
      }
    });

    return new Response(
      JSON.stringify({
        message: "Workout completed successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error finishing active workout:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to finish active workout",
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
