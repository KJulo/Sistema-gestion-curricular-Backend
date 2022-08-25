const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAlumno(id) {
  const alumno = await prisma.alumno.findUnique({ where: { id } });
  return alumno;
}

async function getAlumnos(query) {
  const alumnos = await prisma.alumno.findMany(query);
  return alumnos;
}

async function createAlumno(alumno) {
  try {
    const newAlumno = await prisma.alumno.create({ data: alumno });
    return newAlumno;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createClient] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateAlumno(alumno) {
  try {
    const updatedAlumno = await prisma.alumno.update({
      where: { id: alumno.id },
      data: alumno,
    });
    return updatedAlumno;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createClient] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteAlumno(id) {
  try {
    const deletedAlumno = await prisma.alumno.delete({ where: { id } });
    return deletedAlumno;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteClient] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getAlumno,
  getAlumnos,
  createAlumno,
  updateAlumno,
  deleteAlumno,
};
