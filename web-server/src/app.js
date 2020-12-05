// Load in core modules
const path = require("path");

// "express" is a function, and we call it to create a new express application
const express = require("express");

// Load in HBS
const hbs = require("hbs");

// this actually creates the express application
const app = express();

// Defines the paths for the Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Sets up the "handlebars" engine and the views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// This serves up the contents of the public, static directory
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

// About page route
app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    name: "mgermaine93",
  });
});

// Help page route
app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    helpMessage: "Hello there, I'm a help message!",
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

app.get("/help/*", (request, response) => {
  response.render("404-page", {
    title: "404",
    name: "mgermaine93",
    errorMessage: "Help article not found",
  });
});

// 404 error page route (the "*" is a wildcard)
app.get("*", (request, response) => {
  response.render("404-page", {
    title: "404",
    name: "mgermaine93",
    errorMessage: "Page not found",
  });
});

// Has the app listen on a specific port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// To run, cd into "web-server" directory and run "node src/app.js"
