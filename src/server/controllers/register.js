const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const register = async (req, res, next) => {
  const { userName, password } = req.body;
  if (await User.findOne({ userName })) {
    const error = new Error("User Name already in use");
    error.code = 400;
    next(error);
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      userName,
      password: encryptedPassword,
    };
    const createdUser = await User.create(userData);
    res.json(createdUser);
  }
};

module.exports = register;
