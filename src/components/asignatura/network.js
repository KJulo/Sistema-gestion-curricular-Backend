const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getAsignatura(req.params)
    .then((asignatura) => {
      response.success(req, res, asignatura, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.get("/", (req, res) => {
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
    .getAsignaturas(filterItems, orders)
    .then((asignatura) => {
      response.success(req, res, asignatura, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createAsignatura(req.body.id_curso, req.body.nombre)
    .then((asignaturaCreada) => {
      response.success(req, res, asignaturaCreada, null, 201);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateAsignatura(req.params.id, req.body.nombre)
    .then((asignaturaActualizada) => {
      if (asignaturaActualizada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          asignaturaActualizada.meta.cause
        );
      } else {
        response.success(req, res, asignaturaActualizada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteAsignatura(req.params.id)
    .then((asignaturaEliminada) => {
      if (asignaturaEliminada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          asignaturaEliminada.meta.cause
        );
      } else {
        response.success(req, res, asignaturaEliminada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
