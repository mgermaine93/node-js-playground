// Get the path to the folder
const path = require("path");
// Load in the HTTP core module
const http = require("http");
// Load in the express library
const express = require("express");
// Load in an instance of Socket.io ... this also sets up a file that can be served up
const socketio = require("socket.io");

// Call the express function to generate a new application
const app = express();
// Creates a new web server by passing in the express app
const server = http.createServer(app);
// Configure socket.io to work on the raw http server
const io = socketio(server);

// Get the port going
const port = process.env.PORT || 3000;
// User the path module
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// For each new connection, print a message
io.on("connection", () => {
  console.log("New web socket connection!");
});

// Start up the actual server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// To initialize npm, first run "npm init" in the root project directory, complete the questionnaire, and submit.
// To install express, run "npm i express"
