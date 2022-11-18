-- DropForeignKey
ALTER TABLE "nota" DROP CONSTRAINT "nota_id_alumno_fkey";

-- DropForeignKey
ALTER TABLE "nota" DROP CONSTRAINT "nota_id_asignatura_fkey";

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
