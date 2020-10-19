const jwt = require("jsonwebtoken");

exports.modules = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token provided");

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decode;
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
