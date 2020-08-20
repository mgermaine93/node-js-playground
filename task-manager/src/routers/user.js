const express = require("express");
const User = require("../models/user");
const router = new express.Router();

////////////////////// USERS /////////////////////////

// Create a user
router.post("/users", async (request, response) => {
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
router.get("/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.status(201).send(users);
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets individual users by ID
router.get("/users/:id", async (request, response) => {
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
router.patch("/users/:id", async (request, response) => {
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
    const user = await User.findById(request.params.id);

    // Dynamic updating
    updates.forEach((update) => (user[update] = request.body[update]));

    await user.save();

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
router.delete("/users/:id", async (request, response) => {
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

module.exports = router;
