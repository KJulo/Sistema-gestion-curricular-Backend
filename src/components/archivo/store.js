const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getArchivo(id) {
  const archivo = await prisma.archivo.findUnique({ where: id });
  return archivo;
}

async function getArchivos(query) {
  const archivos = await prisma.archivo.findMany(query);
  return archivos;
}

async function createArchivo(archivo) {
  try {
    const newArchivo = await prisma.archivo.create({ data: archivo });
    return newArchivo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createClient] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function updateArchivo(archivo) {
  try {
    const updatedArchivo = await prisma.archivo.update({
      where: { id: archivo.id },
      data: archivo,
    });
    return updatedArchivo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[createClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[createClient] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

async function deleteArchivo(id) {
  try {
    const deletedArchivo = await prisma.archivo.delete({ where: { id } });
    return deletedArchivo;
  } catch (error) {
    if (error.meta.cause) {
      error.meta.cause = `[deleteClient] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[deleteClient] ${error.meta.field_name}`;
    }

    return { catchError: true, ...error };
  }
}

module.exports = {
  getArchivo,
  getArchivos,
  createArchivo,
  updateArchivo,
  deleteArchivo,
};
