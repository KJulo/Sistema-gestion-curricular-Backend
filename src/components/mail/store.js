const mg = require("mailgun-js");

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

async function sendEmail(mail) {
  try {
    console.log(mail);
    await mailgun()
      .messages()
      .send( mail , (error, body) => {
        if (error) {
          console.log(error);
          return { catchError: true, ...error };
        }
        console.log(body);
        return body;
      });
    return "Mail enviado con exito";
  } catch (error) {
    console.log(error);
    return { catchError: true, ...error };
  }
}

module.exports = { sendEmail };
