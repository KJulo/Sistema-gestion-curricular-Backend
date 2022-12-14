const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.get("/:id", auth("administrador"), (req, res) => {
  controller
    .getAdministrador(req.params.id)
    .then((data) => {
      response.success(req, res, data, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.get("/", auth("administrador"), (req, res) => {
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
    .getAdministradores(filterItems, orders)
    .then((administradores) => {
      response.success(req, res, administradores, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
