// CRUD = Create, Read, Update, Delete

// Destructuring (shorthand for grabbing stuff off of mongodb)
const { MongoClient, ObjectID } = require("mongodb");

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

    db.collection("tasks").findOne(
      // Gets the last task in the tasks database
      { _id: new ObjectID("5f10c03709aa9728dd9a1dd0") },

      (error, task) => {
        if (error) {
          return console.log("Unable to fetch task");
        }
        console.log(task);
      }
    );

    // Gets all tasks that haven't been completed
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log("There are no tasks that haven't been completed.");
        }
        console.log(tasks);
      });
  }
);
