// DEFINES THE USER MODEL //

// Imports Mongoose and Validator
const mongoose = require("mongoose");
const validator = require("validator");

// Defines the model.  First argument is the name of the model, second argument is the fields you want

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    },
  },
});

// This actually creates the new users
module.exports = User;
