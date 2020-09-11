const sgMail = require("@sendgrid/mail");

const sendgridAPIKey;

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mgermaine93@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Task Manager App, ${name}.  Please enjoy your experience!`
    })
}

module.exports = {
    sendWelcomeEmail
}

// // Enables the sending of emails
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Message was sent!");
//   })
//   .catch((error) => {
//     console.log(error.response.body);
//   });
