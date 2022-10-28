-- DropForeignKey
ALTER TABLE "asignatura" DROP CONSTRAINT "asignatura_id_profesor_fkey";

-- AlterTable
ALTER TABLE "asignatura" ALTER COLUMN "id_profesor" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "asignatura" ADD CONSTRAINT "asignatura_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
