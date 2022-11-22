const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { mealSchema, dailyMealsSchema } = require("../../schemas");

const ctrl = require("../../controllers");

const router = express.Router();

router.post(
  "/addmeal",
  authenticate,
  validateBody(mealSchema),
  ctrlWrapper(ctrl.addMeal)
);

router.post(
  "/getdailymeals",
  authenticate,
  validateBody(dailyMealsSchema),
  ctrlWrapper(ctrl.getDailyMeals)
);

router.delete("/:mealId", authenticate, ctrlWrapper(ctrl.removeMeal));

module.exports = router;
