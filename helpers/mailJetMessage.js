const Mailjet = require("node-mailjet");
const RequestError = require("./RequestError");
require("dotenv").config();

const { MAILJET_API_KEY, MAILJET_API_SECRET } = process.env;

const mailJetMessage = async ({ to, subject, Vars, html }) => {
  try {
    const mailjet = Mailjet.apiConnect(MAILJET_API_KEY, MAILJET_API_SECRET);
    const { response } = await mailjet.post("send", { version: "v3" }).request({
      FromEmail: "vlad777.od@gmail.com",
      FromName: "Slim-mom team",
      Subject: subject,
      Recipients: [
        {
          Email: to,
        },
      ],
      "Html-part": html,
      Vars,
    });

    return {
      status: response?.status,
      message: "Email sent successfully",
    };
  } catch (error) {
    throw RequestError(
      400,
      error?.message || "Something went wrong. Failed to sent message"
    );
  }
};

module.exports = mailJetMessage;
