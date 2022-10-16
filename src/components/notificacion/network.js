const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getNotificacion(req.params)
    .then((notificacion) => {
      response.success(req, res, notificacion, null, 200);
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
    .getNotificaciones(filterItems, orders)
    .then((notificaciones) => {
      response.success(req, res, notificaciones, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createNotificacion(
      req.body.id_curso,
      req.body.titulo,
      req.body.descripcion,
      req.body.fecha
    )
    .then((notificacionCreada) => {
      if (notificacionCreada.catchError) {
        response.error(
          req,
          res,
          notificacionCreada.message,
          null,
          500,
          notificacionCreada.error
        );
      } else {
        response.success(req, res, notificacionCreada, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateNotificacion(
      req.params.id,
      req.body.id_curso,
      req.body.titulo,
      req.body.descripcion,
      req.body.fecha
    )
    .then((notificacionActualizada) => {
      if (notificacionActualizada.catchError) {
        response.error(
          req,
          res,
          notificacionActualizada.message,
          null,
          500,
          notificacionActualizada.error
        );
      } else {
        response.success(req, res, notificacionActualizada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
