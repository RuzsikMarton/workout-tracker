/*
  Warnings:

  - You are about to drop the column `description` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "description",
DROP COLUMN "imageUrl",
ADD COLUMN     "imgUrl" TEXT;
