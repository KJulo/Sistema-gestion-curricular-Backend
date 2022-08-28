const store = require("./store");
const validator = require("../../validator");

const currentComponent = "colegio";

function getColegio(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getColegio(id));
    } else {
      reject(new Error("[Colegio invalido] Faltan datos"));
    }
  });
}

function getColegios(filterItems, ordersItems) {
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
    resolve(store.getColegios(query));
  });
}

function createColegio(nombre, direccion) {
  return new Promise((resolve, reject) => {
    if (!nombre && !direccion) {
      reject(new Error("[Colegio invalido] Faltan datos"));
    } else {
      const colegio = {
        nombre,
        direccion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, colegio)) {
        resolve(store.createColegio(colegio));
      } else {
        reject(new Error("[Colegio invalido] Faltan datos"));
      }
    }
  });
}

function updateColegio(id, nombre, direccion) {
  return new Promise((resolve, reject) => {
    if (!id && !nombre && !direccion) {
      reject(new Error("[Colegio invalido] Faltan datos"));
    } else {
      const colegio = {
        id,
        nombre,
        direccion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, colegio)) {
        resolve(store.updateColegio(colegio));
      } else {
        reject(new Error("[Colegio invalido] Faltan datos"));
      }
    }
  });
}

function deleteColegio(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error("[Colegio invalido] Faltan datos"));
    } else {
      resolve(store.deleteColegio(id));
    }
  });
}

module.exports = {
  getColegio,
  getColegios,
  createColegio,
  updateColegio,
  deleteColegio,
};
