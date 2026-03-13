/*
  Warnings:

  - Made the column `totalVolume` on table `workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workout" ALTER COLUMN "totalVolume" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserExerciseStats" (
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "lastPerformed" TIMESTAMP(3) NOT NULL,
    "lastWorkoutExerciseId" TEXT NOT NULL,
    "bestSetWeight" DOUBLE PRECISION NOT NULL,
    "bestSetReps" INTEGER NOT NULL,
    "heaviestSetWorkoutId" TEXT NOT NULL,
    "bestVolume" DOUBLE PRECISION NOT NULL,
    "bestVolumeWorkoutId" TEXT NOT NULL,
    "bestE1RM" DOUBLE PRECISION NOT NULL,
    "bestE1RMWorkoutId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExerciseStats_pkey" PRIMARY KEY ("userId","exerciseId")
);

-- CreateIndex
CREATE INDEX "UserExerciseStats_exerciseId_idx" ON "UserExerciseStats"("exerciseId");
