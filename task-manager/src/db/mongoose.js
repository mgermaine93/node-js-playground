// Imports Mongoose
const mongoose = require("mongoose");

// Connects to the database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Defines the model.  First argument is the name of the model, second argument is the fields you want
const Book = mongoose.model("Book", {
  title: {
    type: String,
  },
  author: {
    type: String,
  },
});

const theShippingNews = new Book({
  title: "The Shipping News",
  author: "E. Annie Proulx",
});

theShippingNews
  .save()
  .then(() => {
    console.log(theShippingNews);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
