const store = require("./store");
const validator = require("../../validator");

const currentComponent = "administrador";

function getAdministrador(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      resolve(store.getAdministrador(id));
    } else {
      reject(new Error("No se ha especificado el id del administrador"));
    }
  });
}

function getAdministradores(filterItems, ordersItems) {
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
    resolve(store.getAdministradores(query));
  });
}

module.exports = {
  getAdministrador,
  getAdministradores,
};
