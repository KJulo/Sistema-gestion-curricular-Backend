const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const { sendEmail } = require("../mail/controller");

const prisma = new PrismaClient();

async function getNotificacion(id) {
  const notificacion = await prisma.notificacion.findUnique({ where: id });
  return notificacion;
}

async function getNotificaciones(query) {
  const notificaciones = await prisma.notificacion.findMany(query);
  return notificaciones;
}

async function createNotificacion(notificacion) {
  try {
    const newNotificacion = await prisma.notificacion.create({
      data: notificacion,
    });
    const mail = {
      titulo: `${notificacion.titulo} - ${moment(notificacion.fecha).format(
        "DD/MM/YYYY"
      )}`,
      mensaje: notificacion.descripcion,
      destinatarios: [],
    };
    const curso = await prisma.curso.findUnique({
      where: { id: notificacion.id_curso },
      include: { profesor: true },
    });
    // eslint-disable-next-line no-unused-expressions
    curso.id_profesor ? mail.destinatarios.push(curso.profesor.correo) : null;
    const alumnos = await prisma.alumno.findMany({
      where: { id_curso: curso.id },
      include: { apoderado: true },
    });
    alumnos.forEach((alumno) => {
      mail.destinatarios.push(alumno.correo);
      // eslint-disable-next-line no-unused-expressions
      alumno.id_apoderado
        ? mail.destinatarios.push(alumno.apoderado.correo)
        : null;
    });
    sendEmail(mail.titulo, mail.mensaje, mail.destinatarios);

    return newNotificacion;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createNotificacion] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createNotificacion] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateNotificacion(notificacion) {
  try {
    const updatedNotificacion = await prisma.notificacion.update({
      where: { id: notificacion.id },
      data: notificacion,
    });
    return updatedNotificacion;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateNotificacion] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateNotificacion] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteNotificacion(id) {
  try {
    const deletedNotificacion = await prisma.notificacion.delete({
      where: { id },
    });
    return deletedNotificacion;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteNotificacion] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteNotificacion] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

module.exports = {
  getNotificacion,
  getNotificaciones,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion,
};
