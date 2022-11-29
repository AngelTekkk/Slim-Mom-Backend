const { Strategy } = require("passport-google-oauth2");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(req.headers);
    console.log("google profile: ", profile);
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    console.log("google user: ", user);
    if (user) {
      return done(null, user);
    }
    const hashPassword = await bcrypt.hash(uuidv4(), 10);
    const newUser = await User.create({
      name: displayName.trim(),
      email,
      password: hashPassword,
    });
    done(null, newUser);
  } catch (err) {
    done(err, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

module.exports = googleStrategy;
