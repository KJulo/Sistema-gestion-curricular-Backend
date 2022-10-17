/*
  Warnings:

  - Added the required column `correo` to the `apoderado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apoderado" ADD COLUMN     "correo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "notificacion" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
