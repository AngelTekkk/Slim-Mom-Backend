const {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordSchema,
  resendEmailSchema,
} = require("./user");

const { mealSchema, dailyMealsSchema } = require("./dailyNutrition");
const { dailyIntakeJoiSchema } = require("./dailyIntakeJoiSchema");

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordSchema,
  resendEmailSchema,
  mealSchema,
  dailyMealsSchema,
  dailyIntakeJoiSchema,
};
