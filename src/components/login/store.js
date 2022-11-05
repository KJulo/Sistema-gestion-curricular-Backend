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
      const token = jwt.sign({ ...login[0], role: user.type }, secretKey, {
        expiresIn: "1d",
      });
      return { token, ...login[0] };
    }
    const error = new Error("Usuario y/o contraseña incorrectas");
    error.status = 401;
    throw error;
  } catch (error) {
    return { catchError: true, ...error };
  }
}

module.exports = {
  getLogin,
};
