// DEFINES THE USER MODEL //

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Using schema permits access to middleware necessary for hashing, etc.
const userSchema = new mongoose.Schema({
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

// First argument is name of the event, second argument is the function to run
// Arrow functions don't bind "this"
userSchema.pre("save", async function (next) {
  // this = the individual user (document) that is about to be saved
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); // <-- important!!
});

const User = mongoose.model("User", userSchema);

// This actually creates the new users
module.exports = User;
