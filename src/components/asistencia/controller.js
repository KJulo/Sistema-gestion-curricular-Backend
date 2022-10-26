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

function createAsistencia(id_asignatura, id_alumno, asistencia, fecha) {
  return new Promise((resolve, reject) => {
    if (!id_alumno && !id_asignatura && !asistencia && !fecha) {
      reject(new Error("[Asistencia invalida] Faltan datos"));
    } else {
      const asistenciaI = {
        asistencia,
        fecha: new Date(fecha).toISOString(),
        alumno: {
          connect: { id: id_alumno },
        },
        asignatura: {
          connect: { id: id_asignatura },
        },
      };
      if (validator.validateTypeVariablesModel(currentComponent, asistenciaI)) {
        resolve(store.createAsistencia(asistenciaI));
      } else {
        reject(new Error("[Asistencia invalida] Datos invalidos"));
      }
    }
  });
}

function updateAsistencia(id, id_asignatura, id_alumno, asistencia, fecha) {
  return new Promise((resolve, reject) => {
    if (!id && !id_alumno && !id_asignatura && !asistencia && !fecha) {
      reject(new Error("[Asistencia invalida] Faltan datos"));
    } else {
      const asistenciaI = {
        id,
        id_alumno,
        id_asignatura,
        asistencia,
        fecha: new Date(fecha).toISOString(),
      };
      if (validator.validateTypeVariablesModel(currentComponent, asistenciaI)) {
        resolve(store.updateAsistencia(asistenciaI));
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
