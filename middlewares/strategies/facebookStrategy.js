const { Strategy } = require("passport-facebook");
// const gravatar = require("gravatar");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET_KEY,
  FACEBOOK_CALLBACK_URL,
  APP_URL,
} = process.env;
const callbackURL = `${APP_URL}${FACEBOOK_CALLBACK_URL}`;

const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_SECRET_KEY,
  callbackURL,
  profileFields: ["id", "displayName", "email", "photos"],
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const { emails, displayName } = profile;
    const email = emails[0].value;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }

    const hashPassword = await bcrypt.hash(uuidv4(), 10);
    const newUser = await User.create({
      name: displayName,
      email,
      password: hashPassword,
      verify: true,
      verificationToken: "Facebook",
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);

module.exports = facebookStrategy;
