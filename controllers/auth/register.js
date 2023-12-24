const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const { RequestError, mailJetMessage } = require("../../helpers");

const { APP_URL = "http://localhost:4000" } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.verify) {
    throw RequestError(409, "Email in use");
  }
  if (user && !user.verify) {
    return res.status(201).json({
      user: { name: user.name, email: user.email },
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Slim-Mom verification email",
    Vars: {
      link: `${APP_URL}/api/users/verificate/${verificationToken}`,
    },
    html: "<h1>Welcome to Slim-mom App!</h1><h3>Please verify your email!<br /> Please click to continue<br /><br /><div style='text-align:center;'><a href='[[var:link]]' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a></div>",
  };

  await mailJetMessage(mail);
  console.log("mail: ", mail);

  res.status(201).json({
    user: { name: result.name, email: result.email },
  });
};

module.exports = register;
