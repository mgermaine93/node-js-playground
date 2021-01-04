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

// Not every browser supports this geolocation feature, which is why the error message is included
document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Unfortunately, geolocation is not supported by your browser...')
    }
    // This is the part that actually gets the location
    navigator.geolocation.getCurrentPosition((position) => {

        // Have the client emit "sendLocation" with an object as the data
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    })

    
})