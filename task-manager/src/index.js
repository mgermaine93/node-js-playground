const express = require("express");
// This ensures a connection to the database
require("./db/mongoose");
const User = require("./models/user");
const app = express();
// If the first port doesn't work, use local port 3000
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (request, response) => {
  const user = new User(request.body);
  user
    .save()
    .then(() => {
      // Sends the user back if one is there
      response.send(user);
    })
    .catch((error) => {
      response.status(400).send(error); // Sets a custom response code
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
