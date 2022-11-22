const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema,
} = require("../../schemas");

const ctrl = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.post("/refresh", validateBody(refreshSchema), ctrlWrapper(ctrl.refresh));

// router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

// router.post(
//   "/verify",
//   validateBody(resendEmailSchema),
//   ctrlWrapper(ctrl.resendEmail)
// );

// router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
