const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const controller = require("../mail/controller");

async function accessLogin(user) {
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
      return { token, type: user.type, ...login[0] };
    }
    const error = new Error("Usuario y/o contraseña incorrectas");
    error.status = 401;
    throw error;
  } catch (error) {
    return { catchError: true, ...error };
  }
}

async function forgotPassword(user) {
  try {
    const userPassword = await prisma[`${user.type}`].findMany({
      where: {
        rut: user.rut,
      },
    });
    const idUser = userPassword[0].id;
    const randomstring = Math.random().toString(36).slice(-8);
    const updatedUser = await prisma[`${user.type}`].update({
      where: { id: idUser },
      data: { contrasena: randomstring },
    });
    if (updatedUser.correo) {
      const titulo = "Recuperación de contraseña";
      const mensaje = `Hola ${updatedUser.nombres} ${updatedUser.apellidos}. Su nueva contraseña es: ${randomstring}`;
      await controller
        .sendEmail(titulo, mensaje, updatedUser.correo)
        .then((data) => data)
        .catch((error) => {
          throw error;
        });
      return "Se ha enviado la nueva contraseña a su correo, si no lo encuentra revise su bandeja de spam";
    }
    const error = new Error();
    error.status = 404;
    error.message = "No se ha encontrado un correo asociado a este usuario";
    return { catchError: true, ...error };
  } catch (error) {
    return { catchError: true, ...error };
  }
}

module.exports = { accessLogin, forgotPassword };
