const sgMail = require("@sendgrid/mail");
const { apiKey, sender } = require('./env')

sgMail.setApiKey(apiKey);

module.exports.sendEmail = async (params) => {
  const { to, subject, text, html } = params

  const msg = {
    from: sender,
    to,
    subject,
    text,
    html
  }

  await sgMail.send(msg);
}
