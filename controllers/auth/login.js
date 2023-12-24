const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { createTokens } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Current email is not registered");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw RequestError(401, "Current email address is not verified");
  }

  const { accessToken, refreshToken } = await createTokens(user._id);

  res.json({
    accessToken,
    refreshToken,
    user: { email: user.email, name: user.name },
    dailyDiet: user.dailyDiet,
  });
};

module.exports = login;
