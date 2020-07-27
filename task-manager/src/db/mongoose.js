// Imports Mongoose
const mongoose = require("mongoose");

// Connects to the database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Defines the model.  First argument is the name of the model, second argument is the fields you want
const Task = mongoose.model("task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

// Actually creates a new task in the database
const task = new Task({
  description: "Cook delicious chili dinner.",
  completed: false,
});

// Error handling
task
  .save()
  // When things go well
  .then(() => {
    console.log(task);
  })
  // When things don't go well
  .catch((error) => {
    console.log("Error!", error);
  });
