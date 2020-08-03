const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000; // If the first port doesn't work, use local port 3000

app.use(express.json());

// Create
app.post("/users", (request, response) => {
  const user = new User(request.body);
  user
    .save()
    .then(() => {
      response.send(201).send(user); // Sends the user back if one is there
    })
    .catch((error) => {
      response.status(400).send(error); // Sets a custom response code
    });
});

// Read // Gets all users stored in the database
app.get("/users", (request, response) => {
  User.find({})
    .then((users) => {
      response.send(users);
    })
    .catch((error) => {
      response.status(500).send();
    });
});

// Read // Gets individual users by ID
app.get("/users/:id", (request, response) => {
  const _id = request.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return response.status(404).send(); // if no user is found, send a 404 error
      }
      response.send(user);
    })
    .catch((error) => {
      response.status(500).send();
    });
});

// Create
app.post("/tasks", (request, response) => {
  const task = new Task(request.body);
  task
    .save()
    .then(() => {
      response.status(201).send(task); // Send the task back if one is there
    })
    .catch((error) => {
      response.status(400).send(error); // Sets a custom error code
    });
});

// Create // Get all tasks stored in the database
app.get("/tasks", (request, response) => {
  Task.find({})
    .then((tasks) => {
      response.send(tasks);
    })
    .catch((error) => {
      response.status(500).send();
    });
});

// Read // Gets individual tasks by ID
app.get("/tasks/:id", (request, response) => {
  const _id = request.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return response.status(404).send(); // if no task is found, send a 404 error
      }
      response.send(task);
    })
    .catch((error) => {
      response.status(500).send();
    });
});

// Create // Get individual tasks by ID

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
