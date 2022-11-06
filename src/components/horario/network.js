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
      .getHorario(req.params)
      .then((horario) => {
        response.success(req, res, horario, null, 200);
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
      .getHorarios(filterItems, orders)
      .then((horario) => {
        response.success(req, res, horario, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.post("/", auth("administrador", "profesor"), (req, res) => {
  controller
    .createHorario(
      req.body.dia,
      req.body.idAsignatura,
      req.body.horaInicio,
      req.body.horaTermino
    )
    .then((horarioCreado) => {
      if (horarioCreado.catchError) {
        response.error(
          req,
          res,
          horarioCreado.catchError,
          null,
          500,
          horarioCreado.meta.cause
        );
      } else {
        response.success(req, res, horarioCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", auth("administrador", "profesor"), (req, res) => {
  controller
    .updateCurso(
      req.params.id,
      req.body.dia,
      req.body.idAsignatura,
      req.body.horaInicio,
      req.body.horaTermino
    )
    .then((horarioActualizado) => {
      if (horarioActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          horarioActualizado.meta.cause
        );
      } else {
        response.success(req, res, horarioActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", auth("administrador", "profesor"), (req, res) => {
  controller
    .deleteCurso(req.params.id)
    .then((horarioEliminado) => {
      if (horarioEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          horarioEliminado.meta.cause
        );
      } else {
        response.success(req, res, horarioEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
