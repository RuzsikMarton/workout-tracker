/*
  Warnings:

  - A unique constraint covering the columns `[workoutId,order]` on the table `workout_exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "workout_exercise_workoutId_exerciseId_key";

-- CreateIndex
CREATE UNIQUE INDEX "workout_exercise_workoutId_order_key" ON "workout_exercise"("workoutId", "order");
