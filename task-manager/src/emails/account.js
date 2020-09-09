const sgMail = require("@sendgrid/mail");

const sendgridAPIKey;

sgMail.setApiKey(sendgridAPIKey)

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
