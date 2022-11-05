const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

router.post("/", (req, res) => {
  controller
    .forgotPassword(req.body.rut, req.body.type)
    .then((data) => {
      response.success(req, res, data, null, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error inesperado", null, 500, error);
    });
});

module.exports = router;