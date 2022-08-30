const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getContenido(id) {
  const contenido = await prisma.contenido.findUnique({ where: id });
  return contenido;
}

async function getContenidos(query) {
  const contenidos = await prisma.contenido.findMany(query);
  return contenidos;
}

async function createContenido(contenido) {
  try {
    const newContenido = await prisma.contenido.create({ data: contenido });
    return newContenido;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createContenido] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createContenido] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateContenido(contenido) {
  try {
    const updatedContenido = await prisma.contenido.update({
      where: { id: contenido.id },
      data: contenido,
    });
    return updatedContenido;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateContenido] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateContenido] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteContenido(id) {
  try {
    const deletedContenido = await prisma.contenido.delete({ where: { id } });
    return deletedContenido;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteContenido] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteContenido] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getContenido,
  getContenidos,
  createContenido,
  updateContenido,
  deleteContenido,
};
