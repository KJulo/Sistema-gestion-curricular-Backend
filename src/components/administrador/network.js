const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", err, 500);
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
  controller.getAdministrador(filterItems, orders)
    .then((administrador) => {
      response.success(req, res, administrador, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", err, 500);
    });
})