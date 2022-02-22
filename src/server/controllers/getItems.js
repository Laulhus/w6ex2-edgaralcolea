const Item = require("../../database/models/Item");

const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

module.exports = getItems;
