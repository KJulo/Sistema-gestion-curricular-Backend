const store = require("./store");

function forgotPassword(rut, type) { 
  return new Promise((resolve, reject) => {
    if (!rut || !type) {
      reject(new Error("[Datos invalidos] Faltan datos"));
    } else {
      const data = {
        rut,
        type,
      };
      resolve(store.forgotPassword(data));
    }
  })
}

module.exports = {
  forgotPassword,
}
