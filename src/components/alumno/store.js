const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../mail/controller");

const prisma = new PrismaClient();

async function getAlumno(id) {
  const alumno = await prisma.alumno.findUnique({
    where: id,
    include: {
      curso: true,
      apoderado: true,
      nota: { include: { asignatura: true } },
      asistencia: { include: { asignatura: true } },
    },
  });
  if (alumno.curso) {
    const asignaturas = await prisma.asignatura.findMany({
      where: { curso: { id: alumno.curso.id } },
    });
    const notificacion = await prisma.notificacion.findMany({
      where: {
        curso: { id: alumno.curso.id },
        fecha: { gte: new Date().toISOString() },
      },
      orderBy: { fecha: "asc" },
    });
    return { ...alumno, curso: { ...alumno.curso, asignaturas }, notificacion };
  }
  return alumno;
}

async function getAlumnos(query) {
  const alumnos = await prisma.alumno.findMany({
    ...query,
    include: {
      nota: { include: { asignatura: true } },
      asistencia: { include: { asignatura: true } },
      curso: {
        include: {
          notificacion: {
            where: { fecha: { gte: new Date().toISOString() } },
            orderBy: { fecha: "asc" },
          },
        },
      },
    },
  });
  return alumnos;
}

async function createAlumno(alumno) {
  try {
    const newAlumno = await prisma.alumno.create({ data: alumno });
    if (newAlumno.correo) {
      sendEmail(
        "Bienvenido al Colegio Fuensalvida - Alumno",
        `Te damos la bienvenido a la plataforma del colegio Fuensalvida, para ingresar a la plataforma debes ingresar a la siguiente dirección: ${process.env.FRONT_URL}/login con el siguiente rut y contraseña: ${newAlumno.rut} - ${newAlumno.contrasena}`,
        newAlumno.correo
      );
    }
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
