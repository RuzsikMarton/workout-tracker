/*
  Warnings:

  - You are about to drop the `UserExerciseStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserExerciseStats";

-- CreateTable
CREATE TABLE "user_exercise_stats" (
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "lastPerformed" TIMESTAMP(3),
    "lastWorkoutExerciseId" TEXT,
    "bestSetWeight" DOUBLE PRECISION,
    "bestSetReps" INTEGER,
    "heaviestSetWorkoutExerciseId" TEXT,
    "bestVolume" DOUBLE PRECISION,
    "bestVolumeWorkoutExerciseId" TEXT,
    "bestE1RM" DOUBLE PRECISION,
    "bestE1RMWorkoutExerciseId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_exercise_stats_pkey" PRIMARY KEY ("userId","exerciseId")
);

-- CreateIndex
CREATE INDEX "user_exercise_stats_exerciseId_idx" ON "user_exercise_stats"("exerciseId");
