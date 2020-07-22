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

    // db.collection("books")
    //   .updateOne(
    //     {
    //       // Targets E. Annie Proulx in Robo 3T
    //       _id: new ObjectID("5f10c6da2255c52a352b9fef"),
    //     },
    //     {
    //       // This sets new fields in the given document
    //       $set: {
    //         title: "Accordion Crimes",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .updateMany(
        {
          // This looks for all tasks where "completed" is "false"...
          completed: false,
        },
        {
          // And this sets those uncompleted tasks to "true"
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
