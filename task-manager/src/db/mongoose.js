// CONNECTS TO THE DATABASE //

// Imports Mongoose and Validator
const mongoose = require("mongoose");

// Connects to the database // environment variable
mongoose.connect(process.env.MONGODB_URL.toString(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // Setting to false addresses the deprecation warning
  useFindAndModify: false,
});
