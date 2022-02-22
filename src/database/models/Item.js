const { model, Schema } = require("mongoose");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = model("Item", itemSchema);

module.exports = Item;
