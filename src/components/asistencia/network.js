const express = require("express");

const router = express.Router();

const controller = require("./controller");
const response = require("../../network/response");

router.get("/:id", (req, res) => {
  controller
    .getAsistencia(req.params)
    .then((asistencia) => {
      response.success(req, res, asistencia, null, 200);
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
    .getAsistencia(filterItems, orders)
    .then((asistencia) => {
      response.success(req, res, asistencia,null, 200);
    })
    .catch((err) => {
      console.log(err);
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.post("/", (req, res) => {
  controller
    .createAsistencia(
      req.body.idCurso,
      req.body.idAlumno,
      req.body.asistencia,
      req.body.fecha
    )
    .then((asistenciaCreada) => {
      if (asistenciaCreada) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          asistenciaCreada.meta.cause
        );
      }
      response.success(req, res, asistenciaCreada, null, 201);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateAsistencia(
      req.params.id,
      req.id_curso,
      req.id_alumno,
      req.asistencia,
      req.fecha
    )
    .then((asistenciaActualizada) => {
      if (asistenciaActualizada) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          asistenciaActualizada.meta.cause
        );
      }
      response.success(req, res, asistenciaActualizada, null, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteAsistencia(req.params.id)
    .then((asistenciaEliminada) => {
      if (asistenciaEliminada.catchError) {
        response.error(
          req,
          res,
          "Error inesperado",
          null,
          500,
          asistenciaEliminada.meta.cause
        );
      } else {
        response.success(req, res, asistenciaEliminada, null, 200);
      }
    })
    .catch((err) => {
      response.error(req, res, "Error inesperado", null, 500, err);
    });
});

module.exports = router;
