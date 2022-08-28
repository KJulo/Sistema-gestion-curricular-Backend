const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getContenido(req.params)
    .then((contenido) => {
      response.success(req, res, contenido, null, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error inesperado", null, 500, error);
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
    .getContenidos(filterItems, orders)
    .then((contenidos) => {
      response.success(req, res, contenidos, 200);
    })
    .catch((err) => {
      console.log(err);
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createContenido(
      req.body.id_foro,
      req.body.titulo,
      req.body.tipo,
      req.body.descripcion
    )
    .then((contenidoCreado) => {
      if (contenidoCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          contenidoCreado.meta.cause
        );
      } else {
        response.success(req, res, contenidoCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateContenido(
      req.params.id,
      req.body.id_foro,
      req.body.titulo,
      req.body.tipo,
      req.body.descripcion
    )
    .then((contenidoActualizado) => {
      if (contenidoActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          contenidoActualizado.meta.cause
        );
      } else {
        response.success(req, res, contenidoActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteContenido(req.params.id)
    .then((contenidoEliminado) => {
      if (contenidoEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          contenidoEliminado.meta.cause
        );
      } else {
        response.success(req, res, contenidoEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
