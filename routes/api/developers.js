const express = require("express");

const { authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getDevelopers));

module.exports = router;
