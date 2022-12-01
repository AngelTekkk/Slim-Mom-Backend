const express = require("express");

const { authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers");

const router = express.Router();

router.get("/:product", authenticate, ctrlWrapper(ctrl.findOneProduct));

module.exports = router;
