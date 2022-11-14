const store = require("./store");
const validator = require("../../validator");

const currentComponent = "foro";

function getForo(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getForo(id));
    } else {
      reject(new Error("No se ha especificado el id del foro"));
    }
  });
}

function getForos(filterItems, ordersItems) {
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
    resolve(store.getForos(query));
  });
}

function createForo(
  id_asignatura,
  titulo,
  tipo,
  objetivo,
  objetivoInicio,
  objetivoTermino
) {
  return new Promise((resolve, reject) => {
    if (!id_asignatura && !titulo) {
      reject(new Error("[Foro invalido] Faltan datos"));
    } else {
      const foro = {
        id_asignatura,
        titulo,
        tipo,
        objetivo,
        objetivoInicio,
        objetivoTermino,
      };
      if (validator.validateTypeVariablesModel(currentComponent, foro)) {
        resolve(store.createForo(foro));
      } else {
        reject(new Error("[Foro invalido] Error en datos"));
      }
    }
  });
}

function updateForo(
  id,
  id_asignatura,
  titulo,
  tipo,
  objetivo,
  objetivoInicio,
  objetivoTermino
) {
  return new Promise((resolve, reject) => {
    if (!id && !id_asignatura && !titulo) {
      reject(new Error("[Foro invalido] Faltan datos"));
    } else {
      const foro = {
        id,
        id_asignatura,
        titulo,
        tipo,
        objetivo,
        objetivoInicio,
        objetivoTermino,
      };
      if (validator.validateTypeVariablesModel(currentComponent, foro)) {
        resolve(store.updateForo(foro));
      } else {
        reject(new Error("[Foro invalido] Error en datos"));
      }
    }
  });
}

function deleteForo(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteForo(id));
    } else {
      reject(new Error("No se ha especificado el id del foro"));
    }
  });
}

module.exports = {
  getForo,
  getForos,
  createForo,
  updateForo,
  deleteForo,
};
