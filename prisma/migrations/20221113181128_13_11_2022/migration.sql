/*
  Warnings:

  - Made the column `nota` on table `nota` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "nota" ALTER COLUMN "nota" SET NOT NULL;
