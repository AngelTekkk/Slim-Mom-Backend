const { Product } = require("../../models");
const { RequestError } = require("../../helpers");

const findOneProduct = async (req, res) => {
  const { product } = req.params;
  const result = await Product.find(
    { "title.ua": { $regex: product, $options: "i" } },
    { title: "$title.ua", weight: 1, calories: 1 }
  );

  if (result.length < 1) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = findOneProduct;
