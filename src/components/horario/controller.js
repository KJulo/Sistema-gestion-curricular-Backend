const store = require("./store");
const validator = require("../../validator");

const currentComponent = "horario";

function getHorario(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getHorario(id));
    } else {
      reject(new Error("No se ha especificado el id del horario"));
    }
  });
}

function getHorarios(filterItems, ordersItems) {
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
    resolve(store.getHorarios(query));
  });
}

function createHorario(dia, idAsignatura, horaInicio, horaTermino) {
  return new Promise((resolve, reject) => {
    if (!dia && !idAsignatura && !horaInicio && !horaTermino) {
      reject(new Error("[Horario invalido] Faltan datos"));
    } else {
      const horario = {
        dia,
        idAsignatura,
        horaInicio,
        horaTermino,
      };
      if (validator.validateTypeVariablesModel(currentComponent, horario)) {
        resolve(store.createHorario(horario));
      } else {
        reject(new Error("[Horario invalido] Error en datos"));
      }
    }
  });
}

function updateHorario(id, dia, idAsignatura, horaInicio, horaTermino) {
  return new Promise((resolve, reject) => {
    if (!id && !dia && !idAsignatura && !horaInicio && !horaTermino) {
      reject(new Error("[Horario invalido] Faltan datos"));
    } else {
      const horario = {
        id,
        dia,
        idAsignatura,
        horaInicio,
        horaTermino,
      };
      if (validator.validateTypeVariablesModel(currentComponent, horario)) {
        resolve(store.updateHorario(horario));
      } else {
        reject(new Error("[Horario invalido] Error en datos"));
      }
    }
  });
}

function deleteHorario(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.deleteHorario(id));
    } else {
      reject(new Error("No se ha especificado el id del horario"));
    }
  });
}

module.exports = {
  getHorario,
  getHorarios,
  createHorario,
  updateHorario,
  deleteHorario,
};
