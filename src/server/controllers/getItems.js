const debug = require("debug")("items:server:controllers");
const Item = require("../../database/models/Item");

const getItems = async (req, res) => {
  const { id } = req.body;
  debug(id);
  const items = await Item.find({ userId: id });
  res.json(items);
};

module.exports = getItems;
