const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAlumno(id) {
  
  const alumno = await prisma.alumno.findUnique({
    where: id,
    include: { curso: true, apoderado: true },
  });
  if (alumno.curso) {
    const asignaturas = await prisma.asignatura.findMany({
      where: { curso: { id: alumno.curso.id } },
    });
    return { ...alumno, curso: { ...alumno.curso, asignaturas } };
  }
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
      error.meta.cause = `[createAlumno] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createAlumno] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateAlumno(alumno) {
  try {
    const updatedAlumno = await prisma.alumno.update({
      where: { id: alumno.id },
      data: alumno,
      include: { apoderado: true },
    });
    return updatedAlumno;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateAlumno] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateAlumno] ${error.meta.field_name}`;
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
      error.meta.cause = `[deleteAlumno] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteAlumno] ${error.meta.field_name}`;
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
