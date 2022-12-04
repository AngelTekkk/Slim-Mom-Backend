const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const verifyKey = async (req, res) => {
  const { key } = req.params;
  const user = await User.findOneAndUpdate(
    { key },
    { verifiedKey: true },
    {
      new: true,
    }
  );
  if (!user) {
    throw RequestError(404, "Wrong key");
  } else {
    res.json({
      email: user.email,
      verifiedKey: true,
    });
  }
};

module.exports = verifyKey;
