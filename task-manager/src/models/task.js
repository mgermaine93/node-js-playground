// DEFINES THE TASK MODEL //

// Imports Mongoose and Validator
const mongoose = require("mongoose");

// Defines the model.  First argument is the name of the model, second argument is the fields you want
const Task = mongoose.model("task", {
  description: {
    type: String,
    trim: true,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Enables other files to use this file
module.exports = Task;
