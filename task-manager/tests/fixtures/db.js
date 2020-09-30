// This gets the databases set up for test purposes
const jwt = require("jsonwebtoken"); // Generates the JSON web token
const mongoose = require("mongoose"); // Generates an object id
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Charles Campion",
  email: "charles.campion@thestand.com",
  password: "somethingNew123!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET), // creates the JSON web token
    },
  ],
};

// This will assure that users are deleted before Jest actually runs its tests
const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
};
