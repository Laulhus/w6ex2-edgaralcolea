const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = new Error("Token missing");
    error.code = 401;
    next(error);
  } else {
    const token = headerAuth.replace("Bearer ", "");
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET);
      req.body = userId;
      next();
    } catch (error) {
      error.code = 401;
      error.message = "Wrong token";
      next(error);
    }
  }
};
module.exports = auth;
