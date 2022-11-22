const Joi = require("joi");

const mealSchema = Joi.object({
  date: Joi.date().required(),
  product: Joi.string().required(),
  grams: Joi.number().integer().required(),
});

const dailyMealsSchema = Joi.object({
  date: Joi.date().required(),
});

module.exports = {
  mealSchema,
};
