const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAsignatura(id) {
  const asignatura = await prisma.asignatura.findUnique({ where: id });
  return asignatura;
}

async function getAsignaturas(query) {
  const asignaturas = await prisma.asignatura.findMany(query);
  return asignaturas;
}

async function createAsignatura(asignatura) {
  try {
    const newAsignatura = await prisma.asignatura.create({ data: asignatura });
    return newAsignatura;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createAsignatura] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createAsignatura] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateAsignatura(asignatura) {
  try {
    const updatedAsignatura = await prisma.asignatura.update({
      where: { id: asignatura.id },
      data: asignatura,
    });
    return updatedAsignatura;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateAsignatura] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateAsignatura] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteAsignatura(id) {
  try {
    const deletedAsignatura = await prisma.asignatura.delete({ where: { id } });
    return deletedAsignatura;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteAsignatura] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteAsignatura] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getAsignatura,
  getAsignaturas,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura,
};
