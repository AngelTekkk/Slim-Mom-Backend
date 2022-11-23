const { DailyNutrition } = require("../../models");
const { RequestError } = require("../../helpers");

const removeMeal = async (req, res) => {
  const { mealId } = req.params;
  const result = await DailyNutrition.findByIdAndRemove(mealId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Meal deleted" });
};

module.exports = removeMeal;
