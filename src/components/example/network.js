const express = require("express");

const router = express.Router();

const controller = require("./controller.js");
const response = require("../../network/response.js");

router.get("/", (req, res) => {
  response.success(req, res, "Hello World", 200);
});

module.exports = router;
