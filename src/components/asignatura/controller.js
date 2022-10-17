const store = require("./store");
const validator = require("../../validator");

const currentComponent = "asignatura";

function getAsignatura(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getAsignatura(id));
    } else {
      reject(new Error("No se ha especificado el id del apoderado"));
    }
  });
}

function getAsignaturas(filterItems, ordersItems) {
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
    resolve(store.getAsignaturas(query));
  });
}

function createAsignatura(id_curso, nombre) {
  return new Promise((resolve, reject) => {
    if (!id_curso && !nombre) {
      reject(new Error("[Asignatura invalida] Faltan datos"));
    } else {
      const asignatura = {
        id_curso,
        nombre,
      };
      if (validator.validateTypeVariablesModel(currentComponent, asignatura)) {
        resolve(store.createAsignatura(asignatura));
      } else {
        reject(new Error("[Asignatura invalida] Error en datos"));
      }
    }
  });
}

function updateAsignatura(id_curso, nombre) {
  return new Promise((resolve, reject) => {
    if (!id_curso && !nombre) {
      reject(new Error("[Asignatura invalida] Faltan datos"));
    } else {
      const asignatura = {
        id_curso,
        nombre,
      };
      if (validator.validateTypeVariablesModel(currentComponent, asignatura)) {
        resolve(store.updateAsignatura(asignatura));
      } else {
        reject(new Error("[Asignatura invalida] Error en datos"));
      }
    }
  });
}

function deleteAsignatura(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteAsignatura(id));
    } else {
      reject(new Error("No se ha especificado el id de la asignatura"));
    }
  });
}

module.exports = {
  getAsignatura,
  getAsignaturas,
  createAsignatura,
  updateAsignatura,
  deleteAsignatura,
};
