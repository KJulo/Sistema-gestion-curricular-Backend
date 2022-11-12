/*
  Warnings:

  - A unique constraint covering the columns `[rut]` on the table `administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rut]` on the table `alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rut]` on the table `apoderado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `apoderado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rut]` on the table `profesor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `profesor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correo` to the `administrador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrador" ADD COLUMN     "correo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "foro" ADD COLUMN     "objetivo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "administrador_rut_key" ON "administrador"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_correo_key" ON "administrador"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_rut_key" ON "alumno"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_correo_key" ON "alumno"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "apoderado_rut_key" ON "apoderado"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "apoderado_correo_key" ON "apoderado"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_rut_key" ON "profesor"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_correo_key" ON "profesor"("correo");
