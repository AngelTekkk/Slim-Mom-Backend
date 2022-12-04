const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

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
