const {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema
} = require("./user");

const { personalDataSchema } = require("./products");

const { mealSchema } = require("./dailyNutrition");

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema,
  personalDataSchema,
  mealSchema,
};
