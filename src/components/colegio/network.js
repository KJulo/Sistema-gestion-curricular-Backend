const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getColegio(req.params)
    .then((colegio) => {
      response.success(req, res, colegio, null, 200);
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
    .getColegios(filterItems, orders)
    .then((colegio) => {
      response.success(req, res, colegio, 200);
    })
    .catch((err) => {
      console.log(err);
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createColegio(req.body.nombre, req.body.direccion)
    .then((colegioCreado) => {
      if (colegioCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          colegioCreado.meta.cause
        );
      } else {
        response.success(req, res, colegioCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateColegio(req.params.id, req.body.nombre, req.body.direccion)
    .then((colegioActualizado) => {
      if (colegioActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          colegioActualizado.meta.cause
        );
      } else {
        response.success(req, res, colegioActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteColegio(req.params.id)
    .then((colegioEliminado) => {
      if (colegioEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          colegioEliminado.meta.cause
        );
      } else {
        response.success(req, res, colegioEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
