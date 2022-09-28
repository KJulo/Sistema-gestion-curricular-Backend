const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getNota(req.params)
    .then((nota) => {
      response.success(req, res, nota, null, 200);
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
    .getNotas(filterItems, orders)
    .then((notas) => {
      response.success(req, res, notas, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createNota(
      req.body.id_asignatura,
      req.body.id_alumno,
      req.body.nombre,
      req.body.nota,
      req.body.descripcion
    )
    .then((notaCreada) => {
      if (notaCreada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          notaCreada.meta.cause
        );
      } else {
        response.success(req, res, notaCreada, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateNota(
      req.params.id,
      req.body.id_asignatura,
      req.body.id_alumno,
      req.body.nombre,
      req.body.nota,
      req.body.descripcion
    )
    .then((notaActualizada) => {
      if (notaActualizada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          notaActualizada.meta.cause
        );
      } else {
        response.success(req, res, notaActualizada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteNota(req.params.id)
    .then((notaEliminada) => {
      if (notaEliminada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          notaEliminada.meta.cause
        );
      } else {
        response.success(req, res, notaEliminada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
