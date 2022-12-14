const express = require("express");
const cors = require("cors");
const config = require("./config");
// const databaseController = require("./database");
const rutes = require("./network/rutes");

const app = express();

app.set("port", config.port);
app.set("json spaces", 2);
app.use(cors({ credentials: true, origin: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

rutes(app);

app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log(` Server on Port: ${app.get("port")}`);
  // databaseController.connectToPostgresql();
});
