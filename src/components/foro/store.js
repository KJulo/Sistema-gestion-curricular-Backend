const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getForo(id) {
  const foro = await prisma.foro.findUnique({ where: { id } });
  return foro;
}

async function getForos(query) {
  const foros = await prisma.foro.findMany(query);
  return foros;
}

async function createForo(foro) {
  try {
    const newForo = await prisma.foro.create({ data: foro });
    return newForo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createForo] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createForo] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateForo(foro) {
  try {
    const updatedForo = await prisma.foro.update({
      where: { id: foro.id },
      data: foro,
    });
    return updatedForo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateForo] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateForo] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteForo(id) {
  try {
    const deletedForo = await prisma.foro.delete({ where: { id } });
    return deletedForo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteForo] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteForo] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getForo,
  getForos,
  createForo,
  updateForo,
  deleteForo,
};
