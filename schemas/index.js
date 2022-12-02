const {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema
} = require("./user");

// const { personalDataSchema } = require("./products");

const { mealSchema, dailyMealsSchema } = require("./dailyNutrition");

const { dailyIntakeJoiSchema } = require("./dailyIntakeJoiSchema");

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema,
  // personalDataSchema,
  mealSchema,
  dailyMealsSchema,
  dailyIntakeJoiSchema,
};
