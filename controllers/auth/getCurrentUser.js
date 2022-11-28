const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { RequestError } = require("../../helpers");

const { ACCESS_TOKEN_SECRET_KEY } = process.env;

// const { SECRET_KEY } = process.env;

const getCurrentUser = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw RequestError(401);
  }
  const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
  const user = await User.findById(id);
  if (!user) {
    throw RequestError(401, "Invalid signature");
  }

  // if (!user.verify) {
  //   throw RequestError(401, "Email not verify");
  // }
  // const payload = {
  //   id: user._id,
  // };
  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  // await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: { email: user.email, name: user.name },
    dailyDiet: user.dailyDiet,
  });

  // res.json({
  //   token,
  //   user: { email: user.email, subscription: user.subscription },
  // });
};

module.exports = getCurrentUser;
