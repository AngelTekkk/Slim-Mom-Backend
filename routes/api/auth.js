const express = require("express");

const { validateBody, authenticate, authSocial } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordSchema,
  resendEmailSchema,
} = require("../../schemas");

const ctrl = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verificate/:verificationToken", ctrlWrapper(ctrl.verificateEmail));

router.post(
  "/verificate",
  validateBody(resendEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.post("/refresh", validateBody(refreshSchema), ctrlWrapper(ctrl.refresh));

router.get("/key/:email", ctrlWrapper(ctrl.sendKey));

router.get("/verify/:key", ctrlWrapper(ctrl.verifyKey));

router.patch(
  "/password",
  validateBody(passwordSchema),
  ctrlWrapper(ctrl.saveNewPassword)
);

router.get(
  "/google",
  authSocial.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  authSocial.authenticate("google", { session: false }),
  ctrlWrapper(ctrl.googleAuth)
);

router.get(
  "/facebook",
  authSocial.authenticate("facebook", { scope: ["email", "public_profile"] })
);
router.get(
  "/facebook/callback",
  authSocial.authenticate("facebook", { session: false }),
  ctrlWrapper(ctrl.facebookAuth)
);

module.exports = router;
