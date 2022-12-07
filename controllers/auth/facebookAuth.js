const { createTokens } = require("../../helpers");
const { SOCIAL_REDIRECT_URL } = process.env;

const facebookAuth = async (req, res) => {
  const { accessToken, refreshToken } = await createTokens(req.user._id);
  res.redirect(
    `${SOCIAL_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = facebookAuth;
