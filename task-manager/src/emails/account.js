const sgMail = require("@sendgrid/mail");

const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const msg = {
  to: "mgermaine93@gmail.com",
  from: "mgermaine93@gmail.com",
  subject: "This is my first email from SendGrid...",
  text: "I hope this is actually successful...",
};
// Enables the sending of emails
sgMail
  .send(msg)
  .then(() => {
    console.log("Message was sent!");
  })
  .catch((error) => {
    console.log(error.response.body);
  });
