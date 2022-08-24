/*
  Warnings:

  - You are about to drop the column `id_administrador` on the `colegio` table. All the data in the column will be lost.
  - You are about to drop the column `id_alumno` on the `colegio` table. All the data in the column will be lost.
  - You are about to drop the column `anio` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `id_alumno` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `id_asistencia` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `id_foro` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `id_nota` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `id_profesor` on the `curso` table. All the data in the column will be lost.
  - Added the required column `fecha` to the `asistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_alumno` to the `asistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `contenido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anho` to the `curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_alumno` to the `nota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asistencia" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_alumno" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "colegio" DROP COLUMN "id_administrador",
DROP COLUMN "id_alumno";

-- AlterTable
ALTER TABLE "contenido" ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "curso" DROP COLUMN "anio",
DROP COLUMN "id_alumno",
DROP COLUMN "id_asistencia",
DROP COLUMN "id_foro",
DROP COLUMN "id_nota",
DROP COLUMN "id_profesor",
ADD COLUMN     "anho" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "nota" ADD COLUMN     "id_alumno" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "alumno_curso" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "id_alumno" TEXT NOT NULL,

    CONSTRAINT "alumno_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesor_curso" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "id_profesor" TEXT NOT NULL,

    CONSTRAINT "profesor_curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archivo" (
    "id" TEXT NOT NULL,
    "id_contenido" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "archivo" TEXT NOT NULL,

    CONSTRAINT "archivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "administrador" ADD CONSTRAINT "administrador_id_colegio_fkey" FOREIGN KEY ("id_colegio") REFERENCES "colegio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
