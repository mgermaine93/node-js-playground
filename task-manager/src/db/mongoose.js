// Imports Mongoose and Validator
const mongoose = require("mongoose");
const validator = require("validator");

// Connects to the database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// // Defines the model.  First argument is the name of the model, second argument is the fields you want

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     require: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid!");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error('Password cannot contain "password');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number!");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "Ben Folds",
//   email: "folds@folds.com",
//   password: "       comePickMeUpI'veLanded    ",
// });

// // Error handling
// me.save()
//   // When things go well
//   .then(() => {
//     console.log(me);
//   })
//   // When things don't go well
//   .catch((error) => {
//     console.log("Error!", error);
//   });

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

// Actually creates a new task in the database
const task = new Task({
  description: "Cook delicious chili dinner.",
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
