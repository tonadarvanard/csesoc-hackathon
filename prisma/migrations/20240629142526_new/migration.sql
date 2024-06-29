/*
  Warnings:

  - Added the required column `exerciseName` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "exerciseName" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;
