const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
const port = process.env.PORT || 3000; // If the first port doesn't work, use local port 3000

app.use(express.json());

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

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
