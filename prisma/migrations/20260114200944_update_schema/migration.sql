/*
  Warnings:

  - You are about to drop the column `equipmentType` on the `exercise` table. All the data in the column will be lost.
  - The `muscleGroup` column on the `exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "equipmentType",
ADD COLUMN     "equipment" TEXT[],
DROP COLUMN "muscleGroup",
ADD COLUMN     "muscleGroup" TEXT[];
