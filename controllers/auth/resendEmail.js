const { User } = require("../../models/user");

const { RequestError, mailJetMessage } = require("../../helpers");

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
    Vars: {
      link: `${APP_URL}/api/users/verificate/${user?.verificationToken}`,
    },
    html: "<h1>Welcome to Slim-mom App!</h1><h3>Please verify your email!<br /> Please click to continue<br /><br /><div style='text-align:center;'><a href='[[var:link]]' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a></div>",
  };

  await mailJetMessage(mail);

  res.json({
    message: "Verification email have been sent",
  });
};

module.exports = resendEmail;
