const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.post("/", (req, res) => {
  controller
    .login(req.body.rut, req.body.password, req.body.type)
    .then((token) => {
      if (token.catchError) {
        response.error(
          req,
          res,
          "Usuario y/o contraseña invalidos",
          null,
          token.status,
          token
        );
      } else {
        response.success(req, res, token, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
