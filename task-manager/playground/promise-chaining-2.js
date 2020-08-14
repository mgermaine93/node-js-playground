// Connects to the database
require("../src/db/mongoose");

// Grabs the task model
const Task = require("../src/models/task");

// // Removes the task with the provided ID from the document
// Task.findByIdAndRemove("5f1f48c48883f66a81dbad3f")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     // Prints out all incomplete tasks
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// With Async/Await
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5f23188e05801f7912adeb6c")
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
