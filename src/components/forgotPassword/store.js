const { PrismaClient } = require("@prisma/client");
const controller = require("../mail/controller");

const prisma = new PrismaClient();

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

    console.log(updatedUser);
    const titulo = "Recuperación de contraseña";
    const destinatarios = updatedUser.correo;
    const mensaje = `Hola ${updatedUser.nombres} ${updatedUser.apellidos}. Su nueva contraseña es: ${randomstring}`;

    await controller
      .sendEmail(titulo, mensaje, updatedUser.correo)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });

    return "se envio el correo xd";
  } catch (error) {
    console.log(error);
    return { catchError: true, ...error };
  }
}

module.exports = { forgotPassword };
