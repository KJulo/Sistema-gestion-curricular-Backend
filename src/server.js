const express = require("express");
const cors = require("cors");
const config = require("./config");
const databaseController = require("./database.js");
const rutes = require("./network/rutes");

const app = express();

app.set("port", config.port);
app.set("json spaces", 2);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

rutes(app);

app.listen(app.get("port"), () => {
  console.log(` Server on Port: ${app.get("port")}`);
  // databaseController.connectToPostgresql();
});
