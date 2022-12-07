const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const { APP_URL = "http://localhost:4000" } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Email not found");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Slim-Mom verification email",
    html: `<a target="_blank" href="${APP_URL}/api/users/verificate/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email have been sent",
  });
};

module.exports = resendEmail;
