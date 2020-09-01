/////////////////////////// TASKS //////////////////////////////

const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/authentication");
const router = new express.Router();

// Create a task
router.post("/tasks", auth, async (request, response) => {
  const task = new Task({
    // ES6 spread operator
    ...request.body,
    owner: request.user._id,
  });

  try {
    await task.save();
    response.status(201).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
});

// Read // Get all tasks stored in the database
router.get("/tasks", async (request, response) => {
  try {
    const tasks = await Task.find({});
    response.send(tasks);
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets individual tasks by ID
router.get("/tasks/:id", async (request, response) => {
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
router.patch("/tasks/:id", async (request, response) => {
  // Converts the object to an array of properties
  const updates = Object.keys(request.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  const task = await Task.findById(request.params.id);

  // Dynamic updating
  updates.forEach((update) => (task[update] = request.body[update]));

  await task.save();

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
router.delete("/tasks/:id", async (request, response) => {
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

module.exports = router;
