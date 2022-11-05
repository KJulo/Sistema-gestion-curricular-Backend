const store = require("./store");

function login(rut, password, type) {
  return new Promise((resolve, reject) => {
    if (!rut && !password && !type) {
      reject(new Error("[Login invalido] Faltan datos"));
    } else if (
      type === "alumno" ||
      type === "apoderado" ||
      type === "profesor" ||
      type === "administrador" 
    ) {
      const loginI = {
        rut,
        password,
        type,
      };
      resolve(store.getLogin(loginI));
    } else {
      reject(new Error("[Login invalido] Error en datos"));
    }
  });
}

module.exports = {
  login,
};
