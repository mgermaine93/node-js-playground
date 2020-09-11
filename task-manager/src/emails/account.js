const sgMail = require("@sendgrid/mail");

const sendgridAPIKey; // API key goes here

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "mgermaine93@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the Task Manager App, ${name}.  Please enjoy your experience!`,
    // HTML can be written here as well, but studies show that plain text has been opened more often than fancy pages.
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    subject: "Sorry to see you go!",
    from: "mgermaine93@gmail.com",
    text: `Thanks for trying out the Task Manager App, ${name}!  Please let us know if I could have done anything to improve the experience of using the app.`,
  });
};

// This allows the functions above to be used by other files
module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};

// // Enables the sending of emails
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Message was sent!");
//   })
//   .catch((error) => {
//     console.log(error.response.body);
//   });
