const { Product } = require("../../models");
const { RequestError } = require("../../helpers");

const productsList = async (req, res) => {
  const result = await Product.find({}, { _id: 0, title: "$title.ua" });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result.map((e) => e.title));
};

module.exports = productsList;
