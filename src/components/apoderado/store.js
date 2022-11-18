const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../mail/controller");

const prisma = new PrismaClient();

async function getApoderado(id) {
  const apoderado = await prisma.apoderado.findUnique({
    where: id,
    include: { alumno: true },
  });
  return apoderado;
}

async function getApoderados(query) {
  const apoderados = await prisma.apoderado.findMany(query);
  return apoderados;
}

async function createApoderado(apoderado) {
  try {
    const newApoderado = await prisma.apoderado.create({ data: apoderado });
    sendEmail(
      "Bienvenido al Colegio Fuensalvida - Apoderado",	
      `Te damos la bienvenido a la plataforma del colegio Fuensalvida, para ingresar a la plataforma debes ingresar a la siguiente dirección: ${process.env.FRONT_URL}/login con el siguiente rut y contraseña: ${newApoderado.rut} - ${newApoderado.contrasena}`,
      newApoderado.correo
    )
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
  deleteApoderado,
};
