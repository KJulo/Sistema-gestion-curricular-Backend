const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getHorario(id) {
  const horario = await prisma.horario.findUnique({ where: id });
  return horario;
}

async function getHorarios(query) {
  const horarios = await prisma.horario.findMany(query);
  return horarios;
}

async function createHorario(horario) {
  try {
    const newHorario = await prisma.horario.create({ data: horario });
    return newHorario;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createHorario] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createHorario] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateHorario(horario) {
  try {
    const updatedHorario = await prisma.horario.update({
      where: { id: horario.id },
      data: horario,
    });
    return updatedHorario;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[updateHorario] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[updateHorario] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteHorario(id) {
  try {
    const deletedHorario = await prisma.horario.delete({ where: { id } });
    return deletedHorario;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteHorario] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteHorario] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getHorario,
  getHorarios,
  createHorario,
  updateHorario,
  deleteHorario,
};
