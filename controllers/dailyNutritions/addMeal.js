const { DailyNutrition, Product } = require("../../models");

const addMeal = async (req, res) => {
  const { _id: owner } = req.user;
  const { product, grams } = req.body;
  const { calories } = await Product.findOne({ "title.ua": product });
  const cal = (grams * calories) / 100;
  const result = await DailyNutrition.create({
    ...req.body,
    calories: cal,
    owner,
  });
  res.status(201).json(result);
};

module.exports = addMeal;
