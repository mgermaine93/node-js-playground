// SERVER

// Load in the core "path" module
const path = require('path');
const http = require('http');
// Load in the express library
const express = require('express');
// Load in the Socket.io library
const socketio = require('socket.io');
// Load in "Bad Words" library
const Filter = require('bad-words');

// Configure the server and get it up and running
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public');

// Serves up the public directory path
app.use(express.static(publicDirectoryPath));

// let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// Print a message to the terminal each time a client connects
io.on('connection', (socket) => {
    console.log("New web socket connection!");
    
    // Have the server emit a message when a new client connects
    socket.emit('message', "Welcome!");

    // Have the server emit a message to everyone BUT the new user when the new user joins
    socket.broadcast.emit('message', "A new user has joined!");

    // Have the server listen for "sendMessage"
    socket.on('sendMessage', (message, callback) => {
        // Initialize bad words
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Hey, language!');
        }
        // Send the message to ALL connected clients
        io.emit('message', message);
        // This send the event acknowledgment to everyone
        callback('Delivered!');
    })

    // Have the server listen for "sendLocation"
    socket.on('sendLocation', (coords, callback) => {

        // When fired, send a "message" to all connected clients "Location: lat, long"
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        // Sets up the server to send back the acknowledgment
        callback()
    })

    // Have the server emit a message to everyone once one user has disconnected
    // (The disconnected user won't get this because they're disconnected)
    socket.on('disconnect', (message) => {
        io.emit('message', "A user has left the chat.")
    });
});

// Start up the actual server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});