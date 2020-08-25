// index.js creates the express app and gets it up and running
// The router files determine what the app actually does

///////////////////// CONSTANTS /////////////////////

const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
// If the first port doesn't work, use local port 3000
const port = process.env.PORT || 3000;

// // only "next" is specific to middleware
// // If "next" isn't called, the middleware won't run
// app.use((request, response, next) => {
//   if (request.method === "GET") {
//     response.send("GET requests are disabled.");
//   } else {
//     next();
//   }
// });

// Middleware function challenge
app.use((request, response, next) => {
  response
    .status(503)
    .send(
      "Site is currently under maintenance.  Please check back again soon!"
    );
});

app.use(express.json());
app.use(userRouter); // <-- Registers the user router... important!
app.use(taskRouter); // <-- Register the task router... important!

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "dummyId" }, "newSignatureGoesHere", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "newSignatureGoesHere");
  console.log(data);

  // const isMatch = await bcrypt.compare(password, hashedPassword); // also returns a promise
  // console.log(isMatch);
};

myFunction();
