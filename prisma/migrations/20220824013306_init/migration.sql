-- CreateTable
CREATE TABLE "administrador" (
    "id" TEXT NOT NULL,
    "id_colegio" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colegio" (
    "id" TEXT NOT NULL,
    "id_administrador" TEXT NOT NULL,
    "id_alumno" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "colegio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumno" (
    "id" TEXT NOT NULL,
    "id_colegio" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesor" (
    "id" TEXT NOT NULL,
    "id_colegio" TEXT NOT NULL,
    "id_alumno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" TEXT NOT NULL,
    "id_profesor" TEXT NOT NULL,
    "id_alumno" TEXT NOT NULL,
    "id_asistencia" TEXT NOT NULL,
    "id_nota" TEXT NOT NULL,
    "id_foro" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "anio" TEXT NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asistencia" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "asistencia" TEXT NOT NULL,

    CONSTRAINT "asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nota" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foro" (
    "id" TEXT NOT NULL,
    "id_curso" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "foro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contenido" (
    "id" TEXT NOT NULL,
    "id_foro" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "contenido_pkey" PRIMARY KEY ("id")
);
