const { DailyNutrition, Product } = require("../../models");
const { RequestError } = require("../../helpers");

const addMeal = async (req, res) => {
  const { _id: owner } = req.user;
  const { product, grams } = req.body;
  const { calories } = await Product.findOne({ "title.ua": product });
  if (!calories) {
    throw RequestError(404, "This product does not exist in the database");
  }
  const cal = ((grams * calories) / 100).toFixed();
  const result = await DailyNutrition.create({
    ...req.body,
    calories: cal,
    owner,
  });
  res.status(201).json(result);
};

module.exports = addMeal;
