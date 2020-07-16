// CRUD = Create, Read, Update, Delete

// Destructuring (shorthand for grabbing stuff off of mongodb)
const { MongoClient, ObjectID } = require("mongodb");

// This is the connection point (Protocol, IP Address, Port)
const connectionURL = "mongodb://127.0.0.1:27017";

// This is the database we'll connect to
const databaseName = "task-manager";

// Generates a new ID
const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString());

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

    // // This inserts a single document into the "books" collection
    // // insertOne() is asynchronous
    // db.collection("books").insertOne(
    //   {
    //     title: "The Shipping News",
    //     author: "E. Annie Proulx",
    //     // "result" returns the data and the document id if things go well
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("An error occurred.  Unable to insert book.");
    //     }
    //     // "ops" is an array of documents, and this will print out all the documents inserted out to the console
    //     console.log(result.ops);
    //   }
    // );

    // // Add more than one document at a time
    // db.collection("books").insertMany(
    //   [
    //     {
    //       title: "Sing Unburied Sing",
    //       author: "Jesmyn Ward",
    //     },
    //     {
    //       title: "Broke Millennial",
    //       author: "Erin Lowry",
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // // Course challenge
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Practice piano.",
    //       completed: true,
    //     },
    //     {
    //       description: "Email website folks.",
    //       completed: false,
    //     },
    //     {
    //       description: "Run",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks!");
    //     }
    //     // Prints the operation output
    //     console.log(result.ops);
    //   }
    // );
  }
);
