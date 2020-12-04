// Load in core modules
const path = require("path");

// "express" is a function, and we call it to create a new express application
const express = require("express");

// this actually creates the express application
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// This gets the "handlebars" module set up
app.set("view engine", "hbs");

// This serves up the contents of the public directory
app.use(express.static(publicDirectoryPath));

// this tells the server what to send back
// first argument is the route, second argument is a function that describes what we want to do when someone visits the particular route

// Home page route w/hbs
app.get("", (request, response) => {
  // name of view to render is the first argument, values we want to access is the second
  response.render("index", {
    title: "Weather App",
    name: "mgermaine93",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    name: "mgermaine93",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    message: "Hello there, I'm a help message!",
    name: "mgermaine93",
  });
});

// Weather page route
app.get("/weather", (request, response) => {
  response.send({
    forecast: "forecast",
    location: "location",
  });
});

// Has the app listen on a specific port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// To run, cd into "web-server" directory and run "node src/app.js"
