const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { createTokens } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
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
