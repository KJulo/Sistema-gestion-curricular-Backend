const store = require("./store");
const validator = require("../../validator");

const currentComponent = "alumno";

function getAlumno(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getAlumno(id));
    } else {
      reject(new Error("No se ha especificado el id del alumno"));
    }
  });
}

function getAlumnos(filterItems, ordersItems) {
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
    resolve(store.getAlumnos(query));
  });
}

function createAlumno(nombres, id_colegio, apellidos, rut, correo, contrasena) {
  return new Promise((resolve, reject) => {
    if (
      !nombres &&
      !id_colegio &&
      !apellidos &&
      !rut &&
      !correo &&
      !contrasena
    ) {
      reject(new Error("[Alumno invalido] Faltan datos"));
    } else {
      const alumno = {
        nombres,
        id_colegio,
        apellidos,
        rut,
        correo,
        contrasena,
      };
      if (validator.validateTypeVariablesModel(currentComponent, alumno)) {
        resolve(store.createAlumno(alumno));
      } else {
        reject(new Error("[Alumno invalido] Error en datos"));
      }
    }
  });
}

function updateAlumno(
  id,
  nombres,
  apellidos,
  id_colegio,
  id_curso,
  id_apoderado,
  rut,
  correo,
  contrasena
) {
  return new Promise((resolve, reject) => {
    if (
      !id &&
      !nombres &&
      !apellidos &&
      !id_colegio &&
      !id_curso &&
      !rut &&
      !correo &&
      !contrasena
    ) {
      reject(new Error("[Alumno invalido] Faltan datos"));
    } else {
      const alumno = {
        id,
        nombres,
        apellidos,
        id_colegio,
        id_curso,
        id_apoderado,
        rut,
        correo,
        contrasena,
      };
      if (validator.validateTypeVariablesModel(currentComponent, alumno)) {
        resolve(store.updateAlumno(alumno));
      } else {
        reject(new Error("[Alumno invalido] Error en datos"));
      }
    }
  });
}

function deleteAlumno(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteAlumno(id));
    } else {
      reject(new Error("No se ha especificado el id del alumno"));
    }
  });
}

module.exports = {
  getAlumno,
  getAlumnos,
  createAlumno,
  updateAlumno,
  deleteAlumno,
};
