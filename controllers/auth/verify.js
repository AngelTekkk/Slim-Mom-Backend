const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { createTokens } = require("../../helpers");
const { SOCIAL_REDIRECT_URL } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  const { accessToken, refreshToken } = await createTokens(user._id);

  // res.json({
  //   message: "Verification successful",
  // });
  res.redirect(
    `${SOCIAL_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = verify;
