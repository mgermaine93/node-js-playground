// index.js creates the express app and gets it up and running
// The router files determine what the app actually does

///////////////////// CONSTANTS /////////////////////
require("dotenv").config({ path: "./config/dev.env" });
const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
// Environment variable
// If the first port doesn't work, use local port 3000
const port = process.env.PORT; // || 3000;

app.use(express.json());
app.use(userRouter); // <-- Registers the user router... important!
app.use(taskRouter); // <-- Register the task router... important!

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log(process.env.MONGODB_URL);
  console.log("Server is up on port " + port);
});
