// Rutas
const administrador = require("../components/administrador/network");
const alumno = require("../components/alumno/network");
const apoderado = require("../components/apoderado/network");
const archivo = require("../components/archivo/network");
const asignatura = require("../components/asignatura/network");
const asistencia = require("../components/asistencia/network");
const colegio = require("../components/colegio/network");
const contenido = require("../components/contenido/network");
const curso = require("../components/curso/network");
const foro = require("../components/foro/network");
const horario = require("../components/horario/network");
const mail = require("../components/mail/network");
const nota = require("../components/nota/network");
const notificacion = require("../components/notificacion/network");
const profesor = require("../components/profesor/network");
const usuario = require("../components/usuario/network");

// Arreglo de rutas
const router = (server) => {
  server.use("/administrador", administrador);
  server.use("/alumno", alumno);
  server.use("/apoderado", apoderado);
  server.use("/archivo", archivo);
  server.use("/asignatura", asignatura);
  server.use("/asistencia", asistencia);
  server.use("/colegio", colegio);
  server.use("/contenido", contenido);
  server.use("/curso", curso);
  server.use("/foro", foro);
  server.use("/horario", horario);
  server.use("/mail", mail);
  server.use("/nota", nota);
  server.use("/notificacion", notificacion);
  server.use("/profesor", profesor);
  server.use("/usuario", usuario);
};

module.exports = router;
