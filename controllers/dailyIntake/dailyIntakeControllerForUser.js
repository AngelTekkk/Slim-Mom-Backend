const { Product, User } = require("../../models");

const { RequestError } = require("../../helpers");

const dailyIntakeControllerForUser = async (req, res, next) => {
  const { age, height, currentWeight, desiredWeight, bloodType } = req.body;
  const { _id: id } = req.user;

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
      title: `$title.ru`,
    }
  );

  const dailyIntake = {
    calories: dailyCaloriesCalculate.toFixed(),
    notAllowedProduct: result.map(
      ({ title = "Sorry we dont find title" }) => title
    ),
  };

  if (!result) {
    throw RequestError(404, "Not found");
  }

  await User.findByIdAndUpdate(id, {
    personalData: {
      age,
      height,
      currentWeight,
      desiredWeight,
      bloodType,
    },
    dailyDiet: dailyIntake,
  });

  res.json(dailyIntake);
};

module.exports = dailyIntakeControllerForUser;
