const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function getLogin(user) {
  try {
    const login = await prisma[`${user.type}`].findMany({
      where: {
        rut: user.rut,
        contrasena: user.password,
      },
    });
    if (login.length > 0) {
      delete login[0].contrasena;
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(login[0],secretKey)
      return token;
    }
    return { error: "Usuario y/o contraseña invalida" };
  } catch (error) {
    console.log(error);
    if (error.meta.cause) {
      error.meta.cause = `[getLogin] ${error.meta.cause}`;
    } else {
      error.meta.cause = `[getLogin] ${error.meta.field_name}`;
    }
    return { catchError: true, ...error };
  }
}

module.exports = {
  getLogin,
};
