const register = require("./auth/register");
const login = require("./auth/login");
const logout = require("./auth/logout");
const refresh = require("./auth/refresh");
const googleAuth = require("./auth/googleAuth");
const facebookAuth = require("./auth/facebookAuth");
const getCurrentUser = require("./auth/getCurrentUser");
const sendKey = require("./auth/sendKey");
const verifyKey = require("./auth/verifyKey");
const saveNewPassword = require("./auth/saveNewPassword");
const resendEmail = require("./auth/resendEmail");
const verificateEmail = require("./auth/verificateEmail");

const addMeal = require("./dailyNutritions/addMeal");
const removeMeal = require("./dailyNutritions/removeMeal");
const getDailyMeals = require("./dailyNutritions/getDailyMeals");

const findOneProduct = require("./products/findOneProduct");
const dailyIntakeController = require("./products/dailyIntakeController");
const dailyIntakeControllerForUser = require("./products/dailyIntakeControllerForUser");

const getDevelopers = require("./developers/getDevelopers");

module.exports = {
  register,
  login,
  logout,
  refresh,
  googleAuth,
  facebookAuth,
  getCurrentUser,
  findOneProduct,
  addMeal,
  removeMeal,
  getDailyMeals,
  dailyIntakeController,
  dailyIntakeControllerForUser,
  getDevelopers,
  sendKey,
  verifyKey,
  saveNewPassword,
  resendEmail,
  verificateEmail,
};
