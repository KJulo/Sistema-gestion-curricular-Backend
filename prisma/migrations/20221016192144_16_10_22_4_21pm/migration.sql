-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
