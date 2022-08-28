const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getAlumno(req.params)
    .then((alumno) => {
      response.success(req, res, alumno, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.get("/", (req, res) => {
  const filterItems = {};
  const orders = [];
  let orderItems = [];

  if (Object.keys(req.query).length !== 0) {
    Object.keys(req.query).forEach((key) => {
      if (
        key !== "id" &&
        key !== "offset" &&
        key !== "limit" &&
        key !== "orderBy"
      ) {
        filterItems[key] = req.query[key];
      } else if (key === "orderBy") {
        orderItems = req.query[key].split(",");
        orderItems.forEach((orderItem) => {
          const item = orderItem.split(" ");
          orders.push({ attribute: item[0], type: item[1] });
        });
      }
    });
  }
  controller
    .getAlumnos(filterItems, orders)
    .then((alumnos) => {
      response.success(req, res, alumnos, 200);
    })
    .catch((err) => {
      console.log(err);
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createAlumno(
      req.body.nombres,
      req.body.idColegio,
      req.body.apellidos,
      req.body.rut,
      req.body.correo,
      req.body.contrasena
    )
    .then((alumnoCreado) => {
      if (alumnoCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          alumnoCreado.meta.cause
        );
      } else {
        response.success(req, res, alumnoCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateAlumno(
      req.params.id,
      req.body.nombres,
      req.body.idColegio,
      req.body.apellidos,
      req.body.rut,
      req.body.correo,
      req.body.contrasena
    )
    .then((alumnoActualizado) => {
      if (alumnoActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          alumnoActualizado.meta.cause
        );
      } else {
        response.success(req, res, alumnoActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteAlumno(req.params.id)
    .then((alumnoEliminado) => {
      if (alumnoEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          alumnoEliminado.meta.cause
        );
      } else {
        response.success(req, res, alumnoEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
