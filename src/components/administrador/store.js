const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAdministrador(id) {
  const agent = await prisma.administrador.findUnique({ where: { id } });
  return agent;
}

async function getAdministradores(query) {
  const agent = await prisma.administrador.findMany(query);
  return agent;
}

module.exports = {
  getAdministrador,
  getAdministradores,
};
