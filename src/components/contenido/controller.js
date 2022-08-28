const store = require("./store");
const validator = require("../../validator");

const currentComponent = "contenido";

function getContenido(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getContenido(id));
    } else {
      reject(new Error("No se ha especificado el id del contenido"));
    }
  });
}

function getContenidos(filterItems, ordersItems) {
  return new Promise((resolve) => {
    const query = {};

    if (Object.keys(filterItems).length > 0) {
      query.where = {};
      Object.keys(filterItems).forEach((key) => {
        const variableType = validator.getFieldType(currentComponent, key);

        if (variableType === "String" && !key.startsWith("id")) {
          query.where[key] = {
            contains: filterItems[key],
            mode: "insensitive",
          };
        } else if (variableType === "Int") {
          query.where[key] = parseInt(filterItems[key], 10);
        } else {
          query.where[key] = filterItems[key];
        }
      });
    }

    query.orderBy = [];
    if (ordersItems.length > 0) {
      ordersItems.forEach((orderItem) => {
        query.orderBy.push({ [orderItem.attribute]: orderItem.type });
      });
    } else {
      query.orderBy = { id: "asc" };
    }
    resolve(store.getContenidos(query));
  });
}

function createContenido(idForo, titulo, tipo, descripcion) {
  return new Promise((resolve, reject) => {
    if (!idForo && !titulo && !tipo && !descripcion) {
      reject(new Error("[Contenido invalido] Faltan datos"));
    } else {
      const contenido = {
        idForo,
        titulo,
        tipo,
        descripcion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, contenido)) {
        resolve(store.createContenido(contenido));
      } else {
        reject(new Error("[Contenido invalido] Datos invalidos"));
      }
    }
  });
}

function updateContenido(id, idForo, titulo, tipo, descripcion) {
  return new Promise((resolve, reject) => {
    if (!id && !idForo && !titulo && !tipo && !descripcion) {
      reject(new Error("[Contenido invalido] Faltan datos"));
    } else {
      const contenido = {
        idForo,
        titulo,
        tipo,
        descripcion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, contenido)) {
        resolve(store.updateContenido(id, contenido));
      } else {
        reject(new Error("[Contenido invalido] Datos invalidos"));
      }
    }
  });
}

function deleteContenido(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteContenido(id));
    } else {
      reject(new Error("No se ha especificado el id del contenido"));
    }
  });
}

module.exports = {
  getContenido,
  getContenidos,
  createContenido,
  updateContenido,
  deleteContenido,
};
