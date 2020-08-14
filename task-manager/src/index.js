const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000; // If the first port doesn't work, use local port 3000

app.use(express.json());

////////////////////// USERS /////////////////////////

// Create a user
app.post("/users", async (request, response) => {
  const user = new User(request.body);

  try {
    // Awaits the promise that comes back from calling the save method
    await user.save();
    response.status(201).send(user);
  } catch (error) {
    response.status(400).send(error);
  }
});

// Read // Gets all users stored in the database
app.get("/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.status(201).send(users);
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets individual users by ID
app.get("/users/:id", async (request, response) => {
  const _id = request.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return response.status(404).send(); // if no user is found, send a 404 error
    }
    response.send(user);
  } catch (error) {
    response.status(500).send();
  }
});

/////////////////////////// TASKS //////////////////////////////

// Create a task
app.post("/tasks", async (request, response) => {
  const task = new Task(request.body);

  try {
    await task.save();
    response.status(201).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
});

// Read // Get all tasks stored in the database
app.get("/tasks", async (request, response) => {
  try {
    const tasks = await Task.find({});
    response.send(tasks);
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets individual tasks by ID
app.get("/tasks/:id", async (request, response) => {
  const _id = request.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return response.status(404).send(); // if no task is found, return a 404 error
    }
    response.send(task);
  } catch (error) {
    response.status(500).send();
  }
});

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
