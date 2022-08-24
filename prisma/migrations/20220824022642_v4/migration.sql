-- DropForeignKey
ALTER TABLE "asistencia" DROP CONSTRAINT "asistencia_id_alumno_fkey";

-- DropForeignKey
ALTER TABLE "asistencia" DROP CONSTRAINT "asistencia_id_curso_fkey";

-- AlterTable
ALTER TABLE "asistencia" ALTER COLUMN "id_curso" DROP NOT NULL,
ALTER COLUMN "id_alumno" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foro" ADD CONSTRAINT "foro_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contenido" ADD CONSTRAINT "contenido_id_foro_fkey" FOREIGN KEY ("id_foro") REFERENCES "foro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivo" ADD CONSTRAINT "archivo_id_contenido_fkey" FOREIGN KEY ("id_contenido") REFERENCES "contenido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
