// "express" is a function, and we call it to create a new express application
const express = require("express");

// this actually creates the express application
const app = express();

// this tells the server what to send back
// first argument is the route, second argument is a function that describes what we want to do when someone visits the particular route

// Home page
app.get("", (request, response) => {
  response.send("This is the home page.");
});

// Help page
app.get("/help", (request, response) => {
  response.send("This is the help page.");
});

// About page
app.get("/about", (request, response) => {
  response.send("This is the about page.");
});

// Weather page
app.get("/weather", (request, response) => {
  response.send("This is the weather page.");
});

// Has the app listen on a specific port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// To run, cd into "web-server" directory and run "node src/app.js"
