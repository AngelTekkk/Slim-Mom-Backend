const { DailyNutrition } = require("../../models");
const { RequestError } = require("../../helpers");

const getDailyMeals = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  const result = await DailyNutrition.find({ owner: _id, date });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getDailyMeals;
