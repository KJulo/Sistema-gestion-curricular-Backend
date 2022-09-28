-- CreateTable
CREATE TABLE "apoderado" (
    "id" TEXT NOT NULL,
    "id_alumno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "apoderado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apoderado" ADD CONSTRAINT "apoderado_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
