const express = require("express");

const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");
const auth = require("../../auth");

router.get(
  "/:id",
  auth("administrador", "profesor", "alumno", "apoderado"),
  (req, res) => {
    controller
      .getCurso(req.params)
      .then((curso) => {
        response.success(req, res, curso, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.get(
  "/",
  auth("administrador", "profesor", "alumno", "apoderado"),
  (req, res) => {
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
      .getCursos(filterItems, orders)
      .then((cursos) => {
        response.success(req, res, cursos, null, 200);
      })
      .catch((err) => {
        response.error(req, res, "Error inesperado", null, 500, err);
      });
  }
);

router.post("/", auth("administrador"), (req, res) => {
  controller
    .createCurso(
      req.body.nombre,
      req.body.anho,
      req.body.paralelo,
      req.body.id_profesor
    )
    .then((cursoCreado) => {
      if (cursoCreado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          cursoCreado.meta.cause
        );
      } else {
        response.success(req, res, cursoCreado, null, 201);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", auth("administrador"), (req, res) => {
  controller
    .updateCurso(
      req.params.id,
      req.body.nombre,
      req.body.anho,
      req.body.paralelo,
      req.body.asignatura,
      req.body.id_asignatura,
      req.body.id_profesor
    )
    .then((cursoActualizado) => {
      if (cursoActualizado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          cursoActualizado.meta.cause
        );
      } else {
        response.success(req, res, cursoActualizado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", auth("administrador"), (req, res) => {
  controller
    .deleteCurso(req.params.id)
    .then((cursoEliminado) => {
      if (cursoEliminado.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          cursoEliminado.meta.cause
        );
      } else {
        response.success(req, res, cursoEliminado, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
