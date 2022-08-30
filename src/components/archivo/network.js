const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getArchivo(req.params)
    .then((archivo) => {
      response.success(req, res, archivo, null, 200);
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
    .getArchivos(filterItems, orders)
    .then((archivos) => {
      response.success(req, res, archivos, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createArchivo(req.body.id_contenido, req.body.nombre, req.body.archivo)
    .then((archivoCreado) => {
      if (archivoCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          archivoCreado.meta.cause
        );
      } else {
        response.success(req, res, archivoCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateArchivo(
      req.params.id,
      req.body.id_contenido,
      req.body.nombre,
      req.body.archivo
    )
    .then((updateArchivo) => {
      if (updateArchivo.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          updateArchivo.meta.cause
        );
      } else {
        response.success(req, res, updateArchivo, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteArchivo(req.params.id)
    .then((archivoEliminado) => {
      if (archivoEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          archivoEliminado.meta.cause
        );
      } else {
        response.success(req, res, archivoEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
