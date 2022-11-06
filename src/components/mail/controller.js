const store = require("./store");

function sendEmail(titulo, mensaje, destinatarios) {
  return new Promise((resolve, reject) => {
    if (!titulo || !mensaje || !destinatarios) {
      reject(new Error("[Datos invalidos] Faltan datos"));
    } else {
      const mail = {
        from: "Sistema curricular <me@samples.mailgun.org>",
        to: destinatarios,
        subject: titulo,
        html: `<p>${mensaje}</p>`,
      };
      resolve(store.sendEmail(mail));
    }
  });
}

module.exports = {
  sendEmail,
};
