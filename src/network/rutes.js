// Rutas
const administrador = require("../components/administrador/network");
const alumno = require("../components/alumno/network");
const archivo = require("../components/archivo/network");
const asistencia = require("../components/asistencia/network");
const colegio = require("../components/colegio/network");
const contenido = require("../components/contenido/network");
const curso = require("../components/curso/network");
const foro = require("../components/foro/network");
const nota = require("../components/nota/network");
const profesor = require("../components/profesor/network");
const apoderado = require("../components/apoderado/network");
const horario = require("../components/horario/network");
const asignatura = require("../components/asignatura/network");
const login = require("../components/login/network");
const forgotPassword = require("../components/forgotPassword/network");
const mail = require("../components/mail/network");

// Arreglo de rutas
const router = (server) => {
  server.use("/administrador", administrador);
  server.use("/alumno", alumno);
  server.use("/archivo", archivo);
  server.use("/asistencia", asistencia);
  server.use("/colegio", colegio);
  server.use("/contenido", contenido);
  server.use("/curso", curso);
  server.use("/foro", foro);
  server.use("/nota", nota);
  server.use("/profesor", profesor);
  server.use("/apoderado", apoderado);
  server.use("/horario", horario);
  server.use("/asignatura", asignatura);
  server.use("/login", login);
  server.use("/forgotPassword", forgotPassword);
  server.use("/mail", mail);
};

module.exports = router;
