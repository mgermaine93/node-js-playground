// Imports Mongoose and Validator
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
    trim: true,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
