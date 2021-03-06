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

// Read // Get all tasks stored in the database (sends back an array of data -- big!)
// GET /tasks?completed=true/false
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt_desc
router.get("/tasks", auth, async (request, response) => {
  const match = {};
  const sort = {};

  if (request.query.completed) {
    match.completed = request.query.completed === "true";
  }

  if (request.query.sortBy) {
    const parts = request.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await request.user
      .populate({
        path: "tasks",
        // These are the tasks we're trying to match
        match,
        options: {
          limit: parseInt(request.query.limit),
          skip: parseInt(request.query.skip),
          sort,
        },
      })
      .execPopulate();
    response.send(request.user.tasks);
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets individual tasks by ID
router.get("/tasks/:id", auth, async (request, response) => {
  const _id = request.params.id;
  try {
    const task = await Task.findOne({ _id, owner: request.user._id });
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
router.patch("/tasks/:id", auth, async (request, response) => {
  // Converts the object to an array of properties
  const updates = Object.keys(request.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return response
      .status(400)
      .send({ error: "Some of those updates were invalid!" });
  }

  try {
    const task = await Task.findOne({
      _id: request.params.id,
      owner: request.user._id,
    });

    if (!task) {
      // If the user doesn't exist, send a 404 error
      return response.status(404).send();
    }

    // Dynamic updating
    updates.forEach((update) => (task[update] = request.body[update]));
    await task.save();

    // const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true, // returns the original user with the updates applied
    //   runValidators: true, // ensures that data arrives in the expected format
    // });

    // If everything goes well, send back the current (updated) user data
    response.send(task);
  } catch (error) {
    // If something goes wrong, send back the error message
    response.status(400).send(error);
  }
});

// Delete a task
router.delete("/tasks/:id", auth, async (request, response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: request.params.id,
      owner: request.user._id,
    });
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
