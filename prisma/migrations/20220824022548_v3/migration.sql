-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_id_colegio_fkey" FOREIGN KEY ("id_colegio") REFERENCES "colegio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumno_curso" ADD CONSTRAINT "alumno_curso_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumno_curso" ADD CONSTRAINT "alumno_curso_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_curso" ADD CONSTRAINT "profesor_curso_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_curso" ADD CONSTRAINT "profesor_curso_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nota" ADD CONSTRAINT "nota_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
