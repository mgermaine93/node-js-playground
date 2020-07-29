// Imports Mongoose and Validator
const mongoose = require("mongoose");
const validator = require("validator");

// Connects to the database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Defines the model.  First argument is the name of the model, second argument is the fields you want
const Book = mongoose.model("book", {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authorEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  author: {
    type: String,
    default: "Unknown",
    validate(value) {
      if (value != "Markus Zusak") {
        throw new Error("Author must be Markus Zusak!");
      }
    },
  },
});

// Actually creates a new task in the database
const book = new Book({
  title: "    I Am The Messenger   ",
  author: "Markus Zusak",
  authorEmail: "zusak@books.com",
});

// Error handling
book
  .save()
  // When things go well
  .then(() => {
    console.log(book);
  })
  // When things don't go well
  .catch((error) => {
    console.log("Error!", error);
  });

// // Defines the model.  First argument is the name of the model, second argument is the fields you want
// const Task = mongoose.model("task", {
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// });

// // Actually creates a new task in the database
// const task = new Task({
//   description: "Cook delicious chili dinner.",
//   completed: false,
// });

// // Error handling
// task
//   .save()
//   // When things go well
//   .then(() => {
//     console.log(task);
//   })
//   // When things don't go well
//   .catch((error) => {
//     console.log("Error!", error);
//   });
