const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getProfesor(id) {
  const profesor = await prisma.profesor.findUnique({ where: { id } });
  return profesor;
}

async function getProfesores(query) {
  const profesores = await prisma.profesor.findMany(query);
  return profesores;
}

async function createProfesor(profesor) {
  try {
    const newProfesor = await prisma.profesor.create({ data: profesor });
    return newProfesor;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createProfesor] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createProfesor] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateProfesor(profesor) {
  try {
    const updatedProfesor = await prisma.profesor.update({
      where: { id: profesor.id },
      data: profesor,
    });
    return updatedProfesor;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateProfesor] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateProfesor] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteProfesor(id) {
  try {
    const deletedProfesor = await prisma.profesor.delete({ where: { id } });
    return deletedProfesor;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteProfesor] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteProfesor] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getProfesor,
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
