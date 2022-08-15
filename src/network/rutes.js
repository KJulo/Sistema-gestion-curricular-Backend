//Rutas
const example = require('../components/example/network.js');

//Arreglo de rutas
const router = function (server){
  server.use('/example', example);
}

module.exports = router;