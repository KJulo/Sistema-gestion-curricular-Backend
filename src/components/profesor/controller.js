const store = require("./store");
const validator = require("../../validator");

const currentComponent = "profesor";

function getProfesor(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getProfesor(id));
    } else {
      reject(new Error("No se ha especificado el id del profesor"));
    }
  });
}

function getProfesores(filterItems, ordersItems) {
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
    resolve(store.getProfesores(query));
  });
}

function createProfesor(
  nombres,
  id_colegio,
  apellidos,
  rut,
  correo,
  contrasena
) {
  return new Promise((resolve, reject) => {
    if (
      !nombres &&
      !id_colegio &&
      !apellidos &&
      !rut &&
      !correo &&
      !contrasena
    ) {
      reject(new Error("[Profesor invalido] Faltan datos"));
    } else {
      const profesor = {
        nombres,
        id_colegio,
        apellidos,
        rut,
        correo,
        contrasena,
      };
      if (validator.validateTypeVariablesModel(currentComponent, profesor)) {
        resolve(store.createProfesor(profesor));
      } else {
        reject(new Error("[Profesor invalido] Error en datos"));
      }
    }
  });
}

function updateProfesor(
  id,
  nombres,
  id_colegio,
  apellidos,
  rut,
  correo,
  contrasena
) {
  return new Promise((resolve, reject) => {
    if (
      !id &&
      !nombres &&
      !id_colegio &&
      !apellidos &&
      !rut &&
      !correo &&
      !contrasena
    ) {
      reject(new Error("[Profesor invalido] Faltan datos"));
    } else {
      const profesor = {
        id,
        nombres,
        id_colegio,
        apellidos,
        rut,
        correo,
        contrasena,
      };
      if (validator.validateTypeVariablesModel(currentComponent, profesor)) {
        resolve(store.updateProfesor(profesor));
      } else {
        reject(new Error("[Profesor invalido] Error en datos"));
      }
    }
  });
}

function deleteProfesor(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteProfesor(id));
    } else {
      reject(new Error("No se ha especificado el id del profesor"));
    }
  });
}

module.exports = {
  getProfesor,
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
