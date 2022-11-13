const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.get(
  "/:id",
  auth("administrador", "profesor", "alumno", "apoderado"),
  (req, res) => {
    controller
      .getForo(req.params)
      .then((foro) => {
        response.success(req, res, foro, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.get(
  "/",
  auth("administrador", "profesor", "alumno", "apoderado"),
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
      .getForos(filterItems, orders)
      .then((foros) => {
        response.success(req, res, foros, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.post("/", auth("administrador", "profesor"), (req, res) => {
  controller
    .createForo(req.body.id_asignatura, req.body.titulo)
    .then((foroCreado) => {
      if (foroCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          foroCreado.meta.cause
        );
      } else {
        response.success(req, res, foroCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", auth("administrador", "profesor"), (req, res) => {
  controller
    .updateForo(req.params.id, req.body.id_asignatura, req.body.titulo)
    .then((foroActualizado) => {
      if (foroActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          foroActualizado.meta.cause
        );
      } else {
        response.success(req, res, foroActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", auth("administrador", "profesor"), (req, res) => {
  controller
    .deleteForo(req.params.id)
    .then((foroEliminado) => {
      if (foroEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          foroEliminado.meta.cause
        );
      } else {
        response.success(req, res, foroEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
