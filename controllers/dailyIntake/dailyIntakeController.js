const { Product } = require("../../models");

const { RequestError } = require("../../helpers");

const dailyIntakeController = async (req, res, next) => {
  const { age, height, currentWeight, desiredWeight, bloodType } = req.body;

  const dailyCaloriesCalculate =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    {
      title: `$title.ua`,
    }
  );

  const dailyIntake = {
    calories: dailyCaloriesCalculate.toFixed(),
    notAllowedProduct: result.map(
      ({ title = "Sorry we don`t find title" }) => title
    ),
  };

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json(dailyIntake);
};

module.exports = dailyIntakeController;
