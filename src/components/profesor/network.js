const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.get(
  "/:id",
  auth("administrador", "profesor", "apoderado", "alumno"),
  (req, res) => {
    controller
      .getProfesor(req.params)
      .then((profesor) => {
        response.success(req, res, profesor, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.get(
  "/",
  auth("administrador", "profesor", "apoderado", "alumno"),
  (req, res) => {
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
      .getProfesores(filterItems, orders)
      .then((profesores) => {
        response.success(req, res, profesores, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.post("/", auth("administrador"), (req, res) => {
  controller
    .createProfesor(
      req.body.nombres,
      req.body.id_colegio,
      req.body.apellidos,
      req.body.rut,
      req.body.correo,
      req.body.contrasena
    )
    .then((profesorCreado) => {
      if (profesorCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          profesorCreado.meta.cause
        );
      } else {
        response.success(req, res, profesorCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", auth("administrador"), (req, res) => {
  controller
    .updateProfesor(
      req.params.id,
      req.body.nombres,
      req.body.id_colegio,
      req.body.apellidos,
      req.body.rut,
      req.body.correo,
      req.body.contrasena
    )
    .then((profesorActualizado) => {
      if (profesorActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          profesorActualizado.meta.cause
        );
      } else {
        response.success(req, res, profesorActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", auth("administrador"), (req, res) => {
  controller
    .deleteProfesor(req.params.id)
    .then((profesorEliminado) => {
      if (profesorEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          profesorEliminado.meta.cause
        );
      } else {
        response.success(req, res, profesorEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
