const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCurso(id) {
  const curso = await prisma.curso.findUnique({ where: { id } });
  return curso;
}

async function getCursos(query) {
  const cursos = await prisma.curso.findMany(query);
  return cursos;
}

async function createCurso(curso) {
  try {
    const newCurso = await prisma.curso.create({ data: curso });
    return newCurso;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createCurso] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createCurso] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateCurso(curso) {
  try {
    const updatedCurso = await prisma.curso.update({
      where: { id: curso.id },
      data: curso,
    });
    return updatedCurso;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateCurso] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateCurso] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteCurso(id) {
  try {
    const deletedCurso = await prisma.curso.delete({ where: { id } });
    return deletedCurso;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteCurso] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteCurso] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getCurso,
  getCursos,
  createCurso,
  updateCurso,
  deleteCurso,
};
