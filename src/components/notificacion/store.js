const { PrismaClient } = require("@prisma/client");

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
