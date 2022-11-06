const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.post(
  "/",
  auth("administrador", "profesor", "alumno", "apoderado"),
  (req, res) => {
    controller
      .sendEmail(req.body.titulo, req.body.mensaje, req.body.destinatarios)
      .then((mail) => {
        response.success(req, res, mail, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

module.exports = router;
