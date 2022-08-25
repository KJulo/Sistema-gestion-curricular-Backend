const express = require("express");
const router = express.Router();

const controller = require("./controller.js");
const response = require("../../network/response.js");

router.get("/:id", function (req, res) {
  controller
    .get(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", err, 500);
    });
});

router.get("/", function (req, res) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var filterItems = {};
  var orders = [];

  if (Object.keys(req.query).length !== 0) {
    Object.keys(req.query).map((key) => {
      if (
        key != "id" &&
        key != "offset" &&
        key != "limit" &&
        key != "orderBy"
      ) {
        filterItems[key] = req.query[key];
      } else if (key == "orderBy") {
        orderItems = req.query[key].split(",");
        orderItems.map((orderItem) => {
          var item = orderItem.split(" ");
          orders.push({ attribute: item[0], type: item[1] });
        });
      }
    });
  }
});
