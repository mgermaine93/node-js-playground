// SERVER

// Load in the core "path" module
const path = require('path');
const http = require('http');
// Load in the express library
const express = require('express');
// Load in the Socket.io library
const socketio = require('socket.io');

// Configure the server and get it up and running
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public');

// Serves up the public directory path
app.use(express.static(publicDirectoryPath));

let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// Print a message to the terminal each time a client connects
io.on('connection', (socket) => {
    console.log("New web socket connection!");
    // Sends an event from the server to the client.
    // The arguments passed in here are accessible in chat.js
    socket.emit('countUpdated', count);
    socket.on('increment', () => {
        count++;
        // Send the updated count to every connection
        io.emit('countUpdated', count);
    })
});

// Start up the actual server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});