/*
  Warnings:

  - You are about to drop the column `id_curso` on the `asistencia` table. All the data in the column will be lost.
  - You are about to drop the column `id_curso` on the `foro` table. All the data in the column will be lost.
  - You are about to drop the column `id_curso` on the `nota` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "asistencia" DROP CONSTRAINT "asistencia_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "foro" DROP CONSTRAINT "foro_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "nota" DROP CONSTRAINT "nota_id_curso_fkey";

-- AlterTable
ALTER TABLE "asistencia" DROP COLUMN "id_curso",
ADD COLUMN     "id_asignatura" TEXT;

-- AlterTable
ALTER TABLE "foro" DROP COLUMN "id_curso",
ADD COLUMN     "id_asignatura" TEXT;

-- AlterTable
ALTER TABLE "nota" DROP COLUMN "id_curso",
ADD COLUMN     "id_asignatura" TEXT;

-- CreateTable
CREATE TABLE "asignatura" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horario" (
    "id" TEXT NOT NULL,
    "id_asignatura" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaTermino" TEXT NOT NULL,

    CONSTRAINT "horario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "asignatura" ADD CONSTRAINT "asignatura_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horario" ADD CONSTRAINT "horario_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foro" ADD CONSTRAINT "foro_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;
