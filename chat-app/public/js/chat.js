// CLIENT

// This connects to the server
const socket = io();

// Elements (these come from the DOM, $ is convention)
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('#submit');
const $sendLocationButton = document.querySelector('#send-location');

// Have the client listen for the "message" and print it to the console
socket.on('message', (message) => {
    console.log(message);
})

// Set-up an event listener for form submissions
$messageForm.addEventListener('submit', (e) => {
    // Prevents the browser from going through a full page refresh
    e.preventDefault()

    // Disables the form once the form has been submitted
    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    // Emit "sendMessage" with input string as message data
    socket.emit('sendMessage', message, (error) => {

        // Enables the form once again
        $messageFormButton.removeAttribute('disabled');

        // Clear the input once the message has been sent
        $messageFormInput.value = "";

        // Automatically highlights the form input field
        $messageFormInput.focus();

        // This runs when the event is acknowledged
        if (error) {
            return console.log(error)
        }
        console.log("Message delivered!")
    });
});

// Not every browser supports this geolocation feature, which is why the error message feature is included
document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Unfortunately, geolocation is not supported by your browser...')
    }

    // Disables the location button for a short time once it has been clicked
    $sendLocationButton.setAttribute('disabled', 'disabled');

    // This is the part that actually gets the location
    navigator.geolocation.getCurrentPosition((position) => {

        // Have the client emit "sendLocation" with an object as the data
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            // Sets up the client acknowledgment function
        }, () => {
            // Enables the sendLocation button once again
            $sendLocationButton.removeAttribute('disabled');
            // Have the client print "Location shared!" when acknowledged
            console.log("Location shared!")
        });
    })

    
})