/*
  Warnings:

  - You are about to drop the `alumno_curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profesor_curso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `direccion` to the `apoderado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `apoderado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_profesor` to the `asignatura` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alumno_curso" DROP CONSTRAINT "alumno_curso_id_alumno_fkey";

-- DropForeignKey
ALTER TABLE "alumno_curso" DROP CONSTRAINT "alumno_curso_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "profesor_curso" DROP CONSTRAINT "profesor_curso_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "profesor_curso" DROP CONSTRAINT "profesor_curso_id_profesor_fkey";

-- AlterTable
ALTER TABLE "alumno" ADD COLUMN     "id_curso" TEXT;

-- AlterTable
ALTER TABLE "apoderado" ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "asignatura" ADD COLUMN     "id_profesor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "curso" ADD COLUMN     "id_profesor" TEXT;

-- DropTable
DROP TABLE "alumno_curso";

-- DropTable
DROP TABLE "profesor_curso";

-- CreateTable
CREATE TABLE "curso_asignatura" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "id_asignatura" TEXT NOT NULL,

    CONSTRAINT "curso_asignatura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_asignatura" ADD CONSTRAINT "curso_asignatura_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_asignatura" ADD CONSTRAINT "curso_asignatura_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignatura" ADD CONSTRAINT "asignatura_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
