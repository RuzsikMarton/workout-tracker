-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- AlterTable
ALTER TABLE "workout" ADD COLUMN     "status" "WorkoutStatus" NOT NULL DEFAULT 'IN_PROGRESS';

-- CreateIndex
CREATE INDEX "workout_userId_status_idx" ON "workout"("userId", "status");
