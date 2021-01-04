// SERVER

// Load in the core "path" module
const path = require('path');

// Other modules and libraries
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');

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
    socket.emit('message', generateMessage("Welcome!"));

    // Have the server emit a message to everyone BUT the new user when the new user joins
    socket.broadcast.emit('message', generateMessage("A new user has joined!"));

    // Have the server listen for "sendMessage"
    socket.on('sendMessage', (message, callback) => {
        // Initialize bad words
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Hey, language!');
        }
        // Send the message to ALL connected clients
        io.emit('message', generateMessage(message));
        // This send the event acknowledgment to everyone
        callback();
    })

    // Have the server listen for "sendLocation"
    socket.on('sendLocation', (coords, callback) => {

        // When fired, have the server emit "locationMessage" with the a google URL
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        // Sets up the server to send back the acknowledgment
        callback()
    })

    // Have the server emit a message to everyone once one user has disconnected
    // (The disconnected user won't get this because they're disconnected)
    socket.on('disconnect', () => {
        io.emit('message', generateMessage("A user has left the chat."))
    });
});

// Start up the actual server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});