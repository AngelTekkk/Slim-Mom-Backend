const register = require("./auth/register");
const login = require("./auth/login");
const logout = require("./auth/logout");
const refresh = require("./auth/refresh");

const productsList = require("./products/productsList");
const findOneProduct = require("./products/findOneProduct");
const diet = require("./products/diet");
const personalDiet = require("./products/personalDiet");

const addMeal = require("./dailyNutritions/addMeal");
const removeMeal = require("./dailyNutritions/removeMeal");
const getDailyMeals = require("./dailyNutritions/getDailyMeals");
const dailyIntakeController = require("./dailyIntake/dailyIntakeController");
const dailyIntakeControllerForUser = require("./dailyIntake/dailyIntakeControllerForUser");

module.exports = {
  register,
  login,
  logout,
  refresh,
  productsList,
  findOneProduct,
  diet,
  personalDiet,
  addMeal,
  removeMeal,
  getDailyMeals,
  dailyIntakeController,
  dailyIntakeControllerForUser,
};
