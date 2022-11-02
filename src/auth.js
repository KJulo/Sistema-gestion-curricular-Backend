
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token")
  if (!token) return res.status(401).send("Acceso no autorizado");
  try {
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Token inválido");
  }
}

module.exports = auth;