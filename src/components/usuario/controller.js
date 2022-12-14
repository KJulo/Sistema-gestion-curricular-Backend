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
      resolve(store.accessLogin(loginI));
    } else {
      reject(new Error("[Login invalido] Error en datos"));
    }
  });
}

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
  });
}

function changePassword(id, password, newPassword, confirmNewPassword, type) {
  return new Promise((resolve, reject) => {
    if (!id || !password || !newPassword || !confirmNewPassword || !type) {
      reject(new Error("[Datos invalidos] Faltan datos"));
    } else {
      const data = {
        id,
        password,
        newPassword,
        confirmNewPassword,
        type,
      };
      resolve(store.changePassword(data));
    }
  });
}

module.exports = {
  login,
  forgotPassword,
  changePassword,
};
