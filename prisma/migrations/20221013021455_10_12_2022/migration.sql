/*
  Warnings:

  - You are about to drop the column `nota` on the `nota` table. All the data in the column will be lost.
  - Added the required column `paralelo` to the `curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ponderacion` to the `nota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "curso" ADD COLUMN     "paralelo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "nota" DROP COLUMN "nota",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ponderacion" TEXT NOT NULL;
