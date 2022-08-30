/*
  Warnings:

  - Added the required column `correo` to the `alumno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alumno" ADD COLUMN     "correo" TEXT NOT NULL;
