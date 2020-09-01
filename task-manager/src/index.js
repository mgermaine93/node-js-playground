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

app.use(express.json());
app.use(userRouter); // <-- Registers the user router... important!
app.use(taskRouter); // <-- Register the task router... important!

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5f4eab702039b2f6f8e64fe6");
  // // Goes off to find the user associated with the task's id
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);

  const user = await User.findById("5f4eaa681030f8f68e069f4a");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
