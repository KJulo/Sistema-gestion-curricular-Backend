/*
  Warnings:

  - You are about to drop the column `id_alumno` on the `apoderado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "apoderado" DROP CONSTRAINT "apoderado_id_alumno_fkey";

-- AlterTable
ALTER TABLE "alumno" ADD COLUMN     "id_apoderado" TEXT;

-- AlterTable
ALTER TABLE "apoderado" DROP COLUMN "id_alumno";

-- AlterTable
ALTER TABLE "colegio" ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "foro" ADD COLUMN     "tipo" TEXT;

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_id_apoderado_fkey" FOREIGN KEY ("id_apoderado") REFERENCES "apoderado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
