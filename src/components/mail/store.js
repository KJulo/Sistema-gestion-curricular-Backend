const mg = require("mailgun-js");

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

async function sendEmail(mail) {
  try {
    await mailgun()
      .messages()
      .send(mail, (error, body) => {
        if (error) {
          return { catchError: true, ...error };
        }
        return body;
      });
    return "Mail enviado con exito";
  } catch (error) {
    return { catchError: true, ...error };
  }
}

module.exports = { sendEmail };
