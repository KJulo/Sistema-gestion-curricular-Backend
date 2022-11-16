const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.post("/login", (req, res) => {
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

router.post("/forgotPassword", (req, res) => {
  controller
    .forgotPassword(req.body.rut, req.body.type)
    .then((data) => {
      response.success(req, res, data, null, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error inesperado", null, 500, error);
    });
});

router.post(
  "/changePassword/:id",
  auth("administrador", "profesor", "apoderado", "alumno"),
  (req, res) => {
    controller
      .changePassword(
        req.params.id,
        req.body.password,
        req.body.newPassword,
        req.body.confirmNewPassword,
        req.body.type
      )
      .then((data) => {
        if (data.catchError) {
          response.error(req, res, data, null, 500, data);
        } else {
          response.success(req, res, data, null, 200);
        }
      })
      .catch((error) => {
        response.error(req, res, error, null, 500, error);
      });
  }
);

module.exports = router;
