const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const login = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    const error = new Error("User not found");
    error.code = 404;
    next(error);
  } else {
    const rightPassword = bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Wrong password");
      error.code = 400;
      next(error);
    } else {
      const userData = {
        name: user.name,
        id: user.id,
      };
      const token = jwt.sign(userData, process.env.JWT_SECRET);
      res.json({ token });
    }
  }
};

module.exports = login;
