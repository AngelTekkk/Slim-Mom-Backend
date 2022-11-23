// const jwt = require("jsonwebtoken");

const { createTokens } = require("../../helpers");

const { GOOGLE_REDIRECT_URL } = process.env;

// const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { accessToken, refreshToken } = await createTokens(req.user._id);

  res.redirect(
    `${GOOGLE_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}&userName=${req.user.name}&userEmail=${req.user.email}`
  );
};

module.exports = googleAuth;
