const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getNota(id) {
  const nota = await prisma.nota.findUnique({ where: id });
  return nota;
}

async function getNotas(query) {
  const notas = await prisma.nota.findMany(query);
  return notas;
}

async function createNota(nota) {
  try {
    const newNota = await prisma.nota.create({ data: nota });
    return newNota;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createNota] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createNota] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateNota(nota) {
  try {
    const updatedNota = await prisma.nota.update({
      where: { id: nota.id },
      data: nota,
    });
    return updatedNota;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateNota] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateNota] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteNota(id) {
  try {
    const deletedNota = await prisma.nota.delete({ where: { id } });
    return deletedNota;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteNota] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteNota] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getNota,
  getNotas,
  createNota,
  updateNota,
  deleteNota,
};
