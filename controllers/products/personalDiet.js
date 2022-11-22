const { Product, User } = require("../../models");
const { RequestError } = require("../../helpers");

const personalDiet = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  const dailyCalories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);
  const products = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    { _id: 0, title: "$title.ua" }
  );
  const dailyDiet = {
    calories: dailyCalories,
    notRecomendedProducts: products.map((e) => e?.title),
  };
  if (!products) {
    throw RequestError(404, "Not found");
  }
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, {
    personalData: {
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    },
    dailyDiet,
  });

  res.json(dailyDiet);
};

module.exports = personalDiet;
