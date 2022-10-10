const store = require("./store");
const validator = require("../../validator");

const currentComponent = "curso";

function getCurso(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getCurso(id));
    } else {
      reject(new Error("No se ha especificado el id del curso"));
    }
  });
}

function getCursoProfesor(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getCursoProfesor(id));
    } else {
      reject(new Error("No se ha especificado el id del curso"));
    }
  })
}

function getCursos(filterItems, ordersItems) {
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
    resolve(store.getCursos(query));
  });
}

function createCurso(nombre, anho, paralelo) {
  return new Promise((resolve, reject) => {
    if (!nombre && !anho && !paralelo) {
      reject(new Error("[Curso invalido] Faltan datos"));
    } else {
      const curso = {
        nombre,
        anho,
        paralelo
      };
      if (validator.validateTypeVariablesModel(currentComponent, curso)) {
        resolve(store.createCurso(curso));
      } else {
        reject(new Error("[Curso invalido] Error en datos"));
      }
    }
  });
}

function updateCurso(id, nombre, anho, paralelo) {
  return new Promise((resolve, reject) => {
    if (!id && !nombre && !anho && !paralelo) {	
      reject(new Error("[Curso invalido] Faltan datos"));
    } else {
      const curso = {
        id,
        nombre,
        anho,
        paralelo
      };
      if (validator.validateTypeVariablesModel(currentComponent, curso)) {
        resolve(store.updateCurso(curso));
      } else {
        reject(new Error("[Curso invalido] Error en datos"));
      }
    }
  });
}

function deleteCurso(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteCurso(id));
    } else {
      reject(new Error("No se ha especificado "));
    }
  });
}

module.exports = {
  getCurso,
  getCursoProfesor,
  getCursos,
  createCurso,
  updateCurso,
  deleteCurso,
};
