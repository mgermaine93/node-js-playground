///////////////////// CONSTANTS /////////////////////

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

// Patch updates an existing resource
// Here we update an individual user by his/her ID
app.patch("/users/:id", async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  // Runs a function for every item in the array
  // If EVERYTHING is true, the function will return true
  // If SOMETHING is false, the function will return false
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return response
      .status(400)
      .send({ error: "Some of those updates were invalid!" });
  }

  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true, // returns the original user with the updates applied
      runValidators: true, // ensures that data arrives in the expected format
    });
    if (!user) {
      // If the user doesn't exist, send a 404 error
      return response.status(404).send();
    }
    // If everything goes well, send back the current (updated) user data
    response.send(user);
  } catch (error) {
    // If something goes wrong, send back the error message
    response.status(400).send(error);
  }
});

// Delete a user
app.delete("/users/:id", async (request, response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).send();
    }
    // Sends the deleted user as the response body
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

// Patch updates an existing resource
// Here we update an individual task by its ID
app.patch("/tasks/:id", async (request, response) => {
  // Converts the object to an array of properties
  const updates = Object.keys(request.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return response
      .status(400)
      .send({ error: "Some of those updates were invalid!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true, // returns the original user with the updates applied
      runValidators: true, // ensures that data arrives in the expected format
    });
    if (!task) {
      // If the user doesn't exist, send a 404 error
      return response.status(404).send();
    }
    // If everything goes well, send back the current (updated) user data
    response.send(task);
  } catch (error) {
    // If something goes wrong, send back the error message
    response.status(400).send(error);
  }
});

// Delete a task
app.delete("/tasks/:id", async (request, response) => {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) {
      return response.status(404).send();
    }
    // Sends the deleted task as the response body
    response.send(task);
  } catch (error) {
    response.status(500).send();
  }
});

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
