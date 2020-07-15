// CRUD = Create, Read, Update, Delete

const mongodb = require("mongodb");

// Create the mongo client, which gives us access to the function necessary to connect to the database and perform CRUD operations
const MongoClient = mongodb.MongoClient;

// This is the connection point (Protocol, IP Address, Port)
const connectionURL = "mongodb://127.0.0.1:27017";

// This is the database we'll connect to
const databaseName = "task-manager";

// This connects to the server and parses the URLs correctly
MongoClient.connect(
  connectionURL,

  // { useNewUrlParser: true }, // deprecated
  { useUnifiedTopology: true },
  (error, client) => {
    // If an error occurs, stop the function and return an error message
    if (error) {
      return console.log(
        "An error occurred.  Unable to connect to the database"
      );
    }

    // This is a reference to the database we want to manipulate
    const db = client.db(databaseName);

    // This inserts a single document into the "books" collection
    db.collection("books").insertOne({
      title: "East of Eden",
      author: "John Steinbeck",
    });
  }
);
