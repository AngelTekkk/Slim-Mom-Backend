const { createTokens } = require("../../helpers");
const { SOCIAL_REDIRECT_URL } = process.env;

const googleAuth = async (req, res) => {
  const { accessToken, refreshToken } = await createTokens(req.user._id);
  req.headers["access-control-allow-origin"] = "http://localhost:3000";
  console.log(req.headers);

  res.redirect(
    `${SOCIAL_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}&userName=${req.user.name}&userEmail=${req.user.email}`
  );
};

module.exports = googleAuth;
