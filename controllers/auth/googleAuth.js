// const jwt = require("jsonwebtoken");

const { createTokens } = require("../../helpers");

const { GOOGLE_REDIRECT_URL } = process.env;

// const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  // if (!user.verify) {
  //   throw RequestError(401, "Email not verify");
  // }
  // const payload = {
  //   id: user._id,
  // };
  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  // await User.findByIdAndUpdate(user._id, { token });

  const { accessToken, refreshToken } = await createTokens(req.user._id);

  res.redirect(
    `${GOOGLE_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}&userName=${req.user.name}&userEmail=${req.user.email}`
  );

  // res.json({
  //   token,
  //   user: { email: user.email, subscription: user.subscription },
  // });
};

module.exports = googleAuth;
