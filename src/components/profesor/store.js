const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../mail/controller");

const prisma = new PrismaClient();

async function getProfesor(id) {
  const profesor = await prisma.profesor.findUnique({
    where: id,
    include: { curso: true, asignatura: true },
  });
  return profesor;
}

async function getProfesores(query) {
  const profesores = await prisma.profesor.findMany(query);
  return profesores;
}

async function createProfesor(profesor) {
  try {
    const newProfesor = await prisma.profesor.create({ data: profesor });
    sendEmail(
      "Bienvenido al Colegio Fuensalvida - Profesor",
      `Te damos la bienvenido a la plataforma del colegio Fuensalvida, para ingresar a la plataforma debes ingresar a la siguiente dirección: ${process.env.FRONT_URL}/login con el siguiente rut y contraseña: ${newProfesor.rut} - ${newProfesor.contrasena}`,
      newProfesor.correo
    );
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
