const { Product } = require("../../models");
const { RequestError } = require("../../helpers");

const diet = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  const dailyCalories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);
  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    { _id: 0, title: "$title.ua" }
  );
  const dailyDiet = {
    calories: dailyCalories,
    notRecomendedProducts: result.map((e) => e?.title),
  };
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(dailyDiet);
};

module.exports = diet;
