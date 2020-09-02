// DEFINES THE USER MODEL //

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

// Using schema permits access to middleware necessary for hashing, etc.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true, // ensures that email addresses are unique
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// localField is a relationship between the user's id and the task owner field
// This is not actually stored in the database
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// This function obscures the hashed passwords and tokens from view in the response...
// Function is called in the user.js model
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// No arrow functions so "this" can be used
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "newSignatureGoesHere");

  // Saves tokens to the database
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// For logging in, it's best practice to provide a single vague error statement
userSchema.statics.findByCredentials = async (email, password) => {
  // Try to find the user by email address
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to log in");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to log in");
  }
  return user;
};

// Hash the plaintext password before saving
userSchema.pre("save", async function (next) {
  // this = the individual user (document) that is about to be saved
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); // <-- important!!
});

// Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  // Comes from the query documentation
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

// This actually creates the new users
module.exports = User;
