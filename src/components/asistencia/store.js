const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAsistencia(id) {
  const asistencia = await prisma.asistencia.findUnique({ where: { id } });
  return asistencia;
}

async function getAsistencias(query) {
  const asistencias = await prisma.asistencia.findMany(query);
  return asistencias;
}

async function createAsistencia(asistencia) {
  try {
    const newAsistencia = await prisma.asistencia.create({ data: asistencia });
    return newAsistencia;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createAsistencia] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createAsistencia] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateAsistencia(asistencia) {
  try {
    const updatedAsistencia = await prisma.asistencia.update({
      where: { id: asistencia.id },
      data: asistencia,
    });
    return updatedAsistencia;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateAsistencia] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateAsistencia] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteAsistencia(id) {
  try {
    const deletedAsistencia = await prisma.asistencia.delete({ where: { id } });
    return deletedAsistencia;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteAsistencia] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteAsistencia] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

module.exports = {
  getAsistencia,
  getAsistencias,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
};
