const jwt = require("jsonwebtoken");

function verifyRoles(...roles) {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).send("Acceso denegado. No hay token");
    } else {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (roles.includes(decoded.role)) {
        next();
      } else {
        res.status(403).json({
          error: "No tienes permiso para realizar esta acción",
        });
      }
    }
  };
}

module.exports = verifyRoles;
