const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
