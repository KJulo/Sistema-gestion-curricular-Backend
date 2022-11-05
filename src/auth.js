const jwt = require("jsonwebtoken");

function verifyRoles(...roles) {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (roles.includes(decoded.role)) {
      next();
    } else {
      res.status(403).json({
        error: "No tienes permiso para realizar esta acción",
      });
    }
  };
}

module.exports = verifyRoles;
