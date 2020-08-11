// Connects to the database
require("../src/db/mongoose");

// Grabs the model
const User = require("../src/models/user");

// Updates the user with the provided ID's age to 1
User.findByIdAndUpdate("5f231a344ee5167955d5f8e5", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    // Prints out all users with an age of 1
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
