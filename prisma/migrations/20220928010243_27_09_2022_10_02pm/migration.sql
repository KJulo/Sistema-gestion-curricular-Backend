/*
  Warnings:

  - Added the required column `telefonoEmergencia` to the `apoderado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apoderado" ADD COLUMN     "telefonoEmergencia" TEXT NOT NULL;
