const {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema
} = require("./user");

const { mealSchema, dailyMealsSchema } = require("./dailyNutrition");
const { dailyIntakeJoiSchema } = require("./dailyIntakeJoiSchema");

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema,
  mealSchema,
  dailyMealsSchema,
  dailyIntakeJoiSchema,
};
