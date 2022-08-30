const store = require("./store");
const validator = require("../../validator");

const currentComponent = "archivo";

function getArchivo(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getArchivo(id));
    } else {
      reject(new Error("No se ha especificado el id del archivo"));
    }
  });
}

function getArchivos(filterItems, ordersItems) {
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
    resolve(store.getArchivos(query));
  });
}

function createArchivo(id_contenido, nombre, archivoUpload) {
  return new Promise((resolve, reject) => {
    if (!id_contenido && !nombre && !archivoUpload) {
      reject(new Error("[Archivo invalido] Faltan datos"));
    } else {
      const archivo = {
        id_contenido,
        nombre,
        archivo: archivoUpload,
      };
      if (validator.validateTypeVariablesModel(currentComponent, archivo)) {
        resolve(store.createArchivo(archivo));
      } else {
        reject(new Error("[Archivo invalido] Error en datos"));
      }
    }
  });
}

function updateArchivo(id, id_contenido, nombre, archivoUpload) {
  return new Promise((resolve, reject) => {
    if (!id && !id_contenido && !nombre && !archivoUpload) {
      reject(new Error("[Archivo invalido] Faltan datos"));
    } else {
      const archivo = {
        id,
        id_contenido,
        nombre,
        archivo: archivoUpload,
      };
      if (validator.validateTypeVariablesModel(currentComponent, archivo)) {
        resolve(store.updateArchivo(archivo));
      } else {
        reject(new Error("[Archivo invalido] Error en datos"));
      }
    }
  });
}

function deleteArchivo(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteArchivo(id));
    } else {
      reject(new Error("No se ha especificado el id del archivo"));
    }
  });
}

module.exports = {
  getArchivo,
  getArchivos,
  createArchivo,
  updateArchivo,
  deleteArchivo,
};
