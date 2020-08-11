// Connects to the database
require("../src/db/mongoose");

// Grabs the task model
const Task = require("../src/models/task");

// Removes the task with the provided ID from the document
Task.findByIdAndRemove("5f1f48c48883f66a81dbad3f")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    // Prints out all incomplete tasks
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
