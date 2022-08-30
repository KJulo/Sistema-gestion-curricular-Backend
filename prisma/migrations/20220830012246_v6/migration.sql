/*
  Warnings:

  - You are about to drop the column `id_alumno` on the `profesor` table. All the data in the column will be lost.
  - Added the required column `correo` to the `profesor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profesor" DROP COLUMN "id_alumno",
ADD COLUMN     "correo" TEXT NOT NULL;
