const store = require("./store");
const validator = require("../../validator");

const currentComponent = "nota";

function getNota(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getNota(id));
    } else {
      reject(new Error("No se ha especificado el id de la nota"));
    }
  });
}

function getNotas(filterItems, ordersItems) {
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
    resolve(store.getNotas(query));
  });
}

function createNota(idCurso, idAlumno, nombre, calificacion, descripcion) {
  return new Promise((resolve, reject) => {
    if (!idCurso && !idAlumno && !nombre && !calificacion && !descripcion) {
      reject(new Error("[Nota invalida] Faltan datos"));
    } else {
      const nota = {
        idCurso,
        idAlumno,
        nombre,
        calificacion,
        descripcion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, nota)) {
        resolve(store.createNota(nota));
      } else {
        reject(new Error("[Nota invalida] Error en datos"));
      }
    }
  });
}

function updateNota(id, idCurso, idAlumno, nombre, calificacion, descripcion) {
  return new Promise((resolve, reject) => {
    if (
      !id &&
      !idCurso &&
      !idAlumno &&
      !nombre &&
      !calificacion &&
      !descripcion
    ) {
      reject(new Error("[Nota invalida] Faltan datos"));
    } else {
      const nota = {
        idCurso,
        idAlumno,
        nombre,
        calificacion,
        descripcion,
      };
      if (validator.validateTypeVariablesModel(currentComponent, nota)) {
        resolve(store.updateNota(nota));
      } else {
        reject(new Error("[Nota invalida] Error en datos"));
      }
    }
  });
}

function deleteNota(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteNota(id));
    } else {
      reject(new Error("No se ha especificado el id de la nota"));
    }
  });
}

module.exports = {
  getNota,
  getNotas,
  createNota,
  updateNota,
  deleteNota,
};
