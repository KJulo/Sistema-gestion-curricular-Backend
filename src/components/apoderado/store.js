const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getApoderado(id) {
  const apoderado = await prisma.apoderado.findUnique({ where: id, include: { alumno: true } });
  return apoderado;
}

async function getApoderados(query) {
  const apoderados = await prisma.apoderado.findMany(query);
  return apoderados;
}

async function createApoderado(apoderado) {
  try {
    const newApoderado = await prisma.apoderado.create({ data: apoderado });
    return newApoderado;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createApoderado] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createApoderado] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateApoderado(apoderado) {
  try {
    const updatedApoderado = await prisma.apoderado.update({
      where: { id: apoderado.id },
      data: apoderado,
    });
    return updatedApoderado;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateApoderado] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateApoderado] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteApoderado(id) {
  try {
    const deletedApoderado = await prisma.apoderado.delete({ where: { id } });
    return deletedApoderado;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteApoderado] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteApoderado] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getApoderado,
  getApoderados,
  createApoderado,
  updateApoderado,
  deleteApoderado
};
