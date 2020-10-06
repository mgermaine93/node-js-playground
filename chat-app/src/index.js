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

// server (emit) -> client (receive) === countUpdated
// client (emit) -> server (receive) === increment

// For each new CONNECTION, print a message
io.on("connection", (socket) => {
  console.log("New web socket connection!");

  // Emit each event from the server to the SINGLE client
  // The server emits "message" whenever a new client connects
  socket.emit("message", "Welcome!");
  // The server emits "message" to everyone BUT the client who just connected
  socket.broadcast.emit("message", "A new user has joined the chat!");

  // Listen for the event ON THE SERVER from the client
  socket.on("sendMessage", (message) => {
    // Emits the event to ALL connections
    io.emit("message", message);
  });
  // "disconnect" is a built-in event
  // "broadcast" is not needed because the disconnected client doesn't need the message
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

// Start up the actual server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// To initialize npm, first run "npm init" in the root project directory, complete the questionnaire, and submit.
// To install express, run "npm i express"
