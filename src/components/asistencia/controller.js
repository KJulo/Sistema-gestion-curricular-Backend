const store = require("./store");
const validator = require("../../validator");

const currentComponent = "asistencia";

function getAsistencia(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getAsistencia(id));
    } else {
      reject(new Error("No se ha especificado la id de la asistencia"));
    }
  });
}

function getAsistencias(filterItems, ordersItems) {
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
    resolve(store.getAsistencias(query));
  });
}

function createAsistencia(idAlumno, idCurso, fecha, hora) {
  return new Promise((resolve, reject) => {
    if (!idAlumno && !idCurso && !fecha && !hora) {
      reject(new Error("[Asistencia invalida] Faltan datos"));
    } else {
      const asistencia = {
        idAlumno,
        idCurso,
        fecha,
        hora,
      };
      if (validator.validateTypeVariablesModel(currentComponent, asistencia)) {
        resolve(store.createAsistencia(asistencia));
      } else {
        reject(new Error("[Asistencia invalida] Datos invalidos"));
      }
    }
  });
}

function updateAsistencia(id, idAlumno, idCurso, fecha, hora) {
  return new Promise((resolve, reject) => {
    if (!id && !idAlumno && !idCurso && !fecha && !hora) {
      reject(new Error("[Asistencia invalida] Faltan datos"));
    } else {
      const asistencia = {
        id,
        idAlumno,
        idCurso,
        fecha,
        hora,
      };
      if (validator.validateTypeVariablesModel(currentComponent, asistencia)) {
        resolve(store.updateAsistencia(asistencia));
      } else {
        reject(new Error("[Asistencia invalida] Datos invalidos"));
      }
    }
  });
}

function deleteAsistencia(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteAsistencia(id));
    } else {
      reject(new Error("No se ha especificado la id de la asistencia"));
    }
  });
}

module.exports = {
  getAsistencia,
  getAsistencias,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
};
