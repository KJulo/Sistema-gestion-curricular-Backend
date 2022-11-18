const store = require("./store");
const validator = require("../../validator");

const currentComponent = "apoderado";

function getApoderado(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getApoderado(id));
    } else {
      reject(new Error("No se ha especificado el id del Apoderado"));
    }
  });
}

function getApoderados(filterItems, ordersItems) {
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
    resolve(store.getApoderados(query));
  });
}
function createApoderado(
  nombres,
  apellidos,
  contrasena,
  rut,
  correo,
  direccion,
  telefono,
  telefonoEmergencia
) {
  return new Promise((resolve, reject) => {
    if (
      !nombres &&
      !apellidos &&
      !contrasena &&
      !rut &&
      !correo &&
      !direccion &&
      !telefono &&
      !telefonoEmergencia
    ) {
      reject(new Error("[Apoderado invalido] Faltan datos"));
    } else {
      const apoderado = {
        nombres,
        apellidos,
        contrasena,
        rut,
        correo,
        direccion,
        telefono,
        telefonoEmergencia,
      };
      if (validator.validateTypeVariablesModel(currentComponent, apoderado)) {
        resolve(store.createApoderado(apoderado));
      } else {
        reject(new Error("[Apoderado invalido] Error en datos"));
      }
    }
  });
}

function updateApoderado(
  id,
  nombres,
  apellidos,
  telefono,
  telefonoEmergencia,
  direccion,
  rut,
  correo,
  contrasena
) {
  return new Promise((resolve, reject) => {
    if (
      !id &&
      !nombres &&
      !apellidos &&
      !telefono &&
      !direccion &&
      !rut &&
      !correo &&
      !contrasena
    ) {
      reject(new Error("[Apoderado invalido] Faltan datos"));
    } else {
      const apoderado = {
        id,
        nombres,
        apellidos,
        telefono,
        telefonoEmergencia,
        direccion,
        rut,
        correo,
        contrasena,
      };
      if (validator.validateTypeVariablesModel(currentComponent, apoderado)) {
        resolve(store.updateApoderado(apoderado));
      } else {
        reject(new Error("[Apoderado invalido] Error en datos"));
      }
    }
  });
}

function deleteApoderado(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteApoderado(id));
    } else {
      reject(new Error("No se ha especificado el id del alumno"));
    }
  });
}

module.exports = {
  getApoderado,
  getApoderados,
  createApoderado,
  updateApoderado,
  deleteApoderado,
};
