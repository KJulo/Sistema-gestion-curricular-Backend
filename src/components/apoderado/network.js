const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.get("/:id", auth("administrador", "profesor"), (req, res) => {
  controller
    .getApoderado(req.params)
    .then((apoderado) => {
      response.success(req, res, apoderado, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.get("/", auth("administrador", "profesor"), (req, res) => {
  const filterItems = {};
  const orders = [];
  let orderItems = [];

  if (Object.keys(req.query).length !== 0) {
    Object.keys(req.query).forEach((key) => {
      if (
        key !== "id" &&
        key !== "offset" &&
        key !== "limit" &&
        key !== "orderBy"
      ) {
        filterItems[key] = req.query[key];
      } else if (key === "orderBy") {
        orderItems = req.query[key].split(",");
        orderItems.forEach((orderItem) => {
          const item = orderItem.split(" ");
          orders.push({ attribute: item[0], type: item[1] });
        });
      }
    });
  }
  controller
    .getApoderados(filterItems, orders)
    .then((apoderado) => {
      response.success(req, res, apoderado, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", auth("adminstrador"), (req, res) => {
  controller
    .createApoderado(
      req.body.nombres,
      req.body.apellidos,
      req.body.contrasena,
      req.body.rut,
      req.body.correo,
      req.body.direccion,
      req.body.telefono,
      req.body.telefonoEmergencia
    )
    .then((apoderado) => {
      if (apoderado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          apoderado.meta.cause
        );
      } else {
        response.success(req, res, apoderado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", auth("adminstrador"), (req, res) => {
  controller
    .updateApoderado(
      req.params.id,
      req.body.nombres,
      req.body.apellidos,
      req.body.contraseña,
      req.body.telefono,
      req.body.telefonoEmergencia
    )
    .then((apoderadoActualizado) => {
      if (apoderadoActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          apoderadoActualizado.meta.cause
        );
      } else {
        response.success(req, res, apoderadoActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", auth("adminstrador"), (req, res) => {
  controller
    .deleteApoderado(req.params.id)
    .then((apoderadoEliminado) => {
      if (apoderadoEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          apoderadoEliminado.meta.cause
        );
      } else {
        response.success(req, res, apoderadoEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
