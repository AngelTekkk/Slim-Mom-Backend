const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { User } = require("../../models");

const {
  RequestError,
  // sendMail
} = require("../../helpers");

// const { PORT = 3000, HEROKU_APP } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // const verificationToken = uuidv4();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    // verificationToken,
  });

  // const mail = {
  //   to: email,
  //   subject: "Verification email",
  //   html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Click to verify email on localhost</a>
  //         <p>OR</p>
  //         <a target="_blank" href="${HEROKU_APP}/api/users/verify/${verificationToken}">Click to verify email on heroku</a>`,
  // };

  // await sendMail(mail);

  res.status(201).json({
    name: result.name,
    email: result.email,
    // verificationToken: result.verificationToken,
  });
};

module.exports = register;
