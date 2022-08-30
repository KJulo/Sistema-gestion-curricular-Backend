const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getColegio(id) {
  const colegio = await prisma.colegio.findUnique({ where: id });
  return colegio;
}

async function getColegios(query) {
  const colegios = await prisma.colegio.findMany(query);
  return colegios;
}

async function createColegio(colegio) {
  try {
    const newColegio = await prisma.colegio.create({ data: colegio });
    return newColegio;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createColegio] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createColegio] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateColegio(colegio) {
  try {
    const updatedColegio = await prisma.colegio.update({
      where: { id: colegio.id },
      data: colegio,
    });
    return updatedColegio;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateColegio] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateColegio] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteColegio(id) {
  try {
    const deletedColegio = await prisma.colegio.delete({ where: { id } });
    return deletedColegio;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteColegio] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteColegio] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

module.exports = {
  getColegio,
  getColegios,
  createColegio,
  updateColegio,
  deleteColegio,
};
