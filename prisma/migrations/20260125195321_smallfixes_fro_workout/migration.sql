/*
  Warnings:

  - You are about to drop the column `completed` on the `exercise_set` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `exercise_set` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `exercise_set` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `exercise_set` table. All the data in the column will be lost.
  - Made the column `reps` on table `exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `exercise_set` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "exercise_set" DROP COLUMN "completed",
DROP COLUMN "distance",
DROP COLUMN "duration",
DROP COLUMN "restTime",
ALTER COLUMN "reps" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL;
