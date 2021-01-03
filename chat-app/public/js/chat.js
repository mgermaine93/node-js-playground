// CLIENT

// This connects to the server
const socket = io();

// Have the client listen for the "message" and print it to the console
socket.on('message', (message) => {
    console.log(message);
})

// Set-up an event listener for form submissions
document.querySelector('#message-form').addEventListener('submit', (e) => {
    // Prevents the browser from going through a full page refresh
    e.preventDefault()
    // const message = document.querySelector("#message").value;
    const message = e.target.elements.message.value;
    // Emit "sendMessage" with input string as message data
    socket.emit('sendMessage', message);
});