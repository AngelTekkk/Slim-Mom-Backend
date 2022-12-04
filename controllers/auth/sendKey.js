const { User } = require("../../models");
const { sendEmail, msg, RequestError } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");

const sendKey = async (req, res) => {
  const { email } = req.params;
  const key = uuidv4();
  const user = await User.findOneAndUpdate(
    { email },
    { key, verifiedKey: false },
    {
      new: true,
    }
  );
  if (!user) {
    throw RequestError(404, "Not found");
  } else {
    const message = msg(user.email, user.name, key);
    await sendEmail(message);
    res.json({
      message: "success",
    });
  }
};

module.exports = sendKey;
