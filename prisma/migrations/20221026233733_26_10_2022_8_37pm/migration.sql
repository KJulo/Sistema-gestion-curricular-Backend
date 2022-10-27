-- DropForeignKey
ALTER TABLE "asignatura" DROP CONSTRAINT "asignatura_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "curso_asignatura" DROP CONSTRAINT "curso_asignatura_id_asignatura_fkey";

-- DropForeignKey
ALTER TABLE "curso_asignatura" DROP CONSTRAINT "curso_asignatura_id_curso_fkey";

-- DropForeignKey
ALTER TABLE "notificacion" DROP CONSTRAINT "notificacion_id_curso_fkey";

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_asignatura" ADD CONSTRAINT "curso_asignatura_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curso_asignatura" ADD CONSTRAINT "curso_asignatura_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignatura" ADD CONSTRAINT "asignatura_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
