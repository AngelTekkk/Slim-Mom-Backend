const express = require("express");
const router = express.Router();
const controll = require("../../controllers");
const { dailyIntakeJoiSchema } = require("../../schemas");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

router.post(
  "/",
  validateBody(dailyIntakeJoiSchema),
  ctrlWrapper(controll.dailyIntakeController)
);

router.post(
  "/user",
  authenticate,
  validateBody(dailyIntakeJoiSchema),
  ctrlWrapper(controll.dailyIntakeControllerForUser)
);

module.exports = router;
