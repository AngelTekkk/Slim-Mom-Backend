const { User } = require("../../models");
const { RequestError, mailJetMessage } = require("../../helpers");
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
    const mail = {
      to: user.email,
      subject: "Activation key. Slim Mom App",
      html: `<h1>Hello, [[var:name]]! You forgot password and want to save new password</h1> 
        <p>Activation key: [[var:key]]</p>
        <p>Please copy activation key and enter in Slim Mom App</p>`,
      Vars: {
        name: user.name,
        key,
      },
    };
    await mailJetMessage(mail);
    res.json({
      message: "success",
    });
  }
};

module.exports = sendKey;
