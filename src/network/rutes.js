// Rutas
const administrador = require("../components/administrador/network");

// Arreglo de rutas
const router = function (server) {
  server.use("/administrador", administrador);
};

module.exports = router;
