const store = require("./store");
const validator = require("../../validator");

const currentComponent = "notificacion";

function getNotificacion(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getNotificacion(id));
    } else {
      reject(new Error("[Notificacion invalido] Faltan datos"));
    }
  });
}

function getNotificaciones(filterItems, ordersItems) {
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
    resolve(store.getNotificaciones(query));
  });
}

function createNotificacion(id_curso, titulo, descripcion, fecha) {
  return new Promise((resolve, reject) => {
    if (!id_curso && !titulo && !descripcion && !fecha) {
      reject(new Error("[Notificacion invalido] Faltan datos"));
    } else {
      const notificacion = {
        id_curso,
        titulo,
        descripcion,
        fecha,
      };
      if (
        validator.validateTypeVariablesModel(currentComponent, notificacion)
      ) {
        resolve(store.createNotificacion(notificacion));
      } else {
        reject(new Error("[Notificacion invalido] Datos invalidos"));
      }
    }
  });
}

function updateNotificacion(id, id_curso, titulo, descripcion, fecha) {
  return new Promise((resolve, reject) => {
    if (!id && !id_curso && !titulo && !descripcion && !fecha) {
      reject(new Error("[Notificacion invalido] Faltan datos"));
    } else {
      const notificacion = {
        id,
        id_curso,
        titulo,
        descripcion,
        fecha,
      };
      if (validator.validateTypeVariablesModel(currentComponent, notificacion)) {
        resolve(store.updateNotificacion(notificacion));
      } else {
        reject(new Error("[Notificacion invalido] Datos invalidos"));
      }
    }
  });
}

function deleteNotificacion(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteNotificacion(id));
    } else {
      reject(new Error("No se ha especificado el id de la notificacion"));
    }
  })
}

module.exports = {
  getNotificacion,
  getNotificaciones,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion,
}