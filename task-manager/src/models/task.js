// DEFINES THE TASK MODEL //

// Imports Mongoose and Validator
const mongoose = require("mongoose");

// Defines the model.  First argument is the name of the model, second argument is the fields you want
const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    // Says that the data stored in owner is going to be an object
    type: mongoose.Schema.Types.ObjectId,
    // Each task must have an owner
    required: true,
    ref: "User",
  },
});

// Enables other files to use this file
module.exports = Task;
