// DEFINES THE TASK MODEL //

// Imports Mongoose and Validator
const mongoose = require("mongoose");

// Using schema permits access to middleware necessary for hashing, etc.

const taskSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

// Enables other files to use this file
module.exports = Task;
