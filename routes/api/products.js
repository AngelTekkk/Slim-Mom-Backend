const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { personalDataSchema } = require("../../schemas");

const ctrl = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.productsList));

router.get("/:product", ctrlWrapper(ctrl.findOneProduct));

router.post("/diet", validateBody(personalDataSchema), ctrlWrapper(ctrl.diet));

router.post(
  "/personalDiet",
  authenticate,
  validateBody(personalDataSchema),
  ctrlWrapper(ctrl.personalDiet)
);

module.exports = router;
