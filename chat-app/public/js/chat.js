//// Server ////
// The "io" function simply "connects"
const socket = io();

// Emit from the server and listen on the client
// Client listens for the "message" event and prints the message to the console
socket.on("message", (message) => {
  console.log(message);
});

// Emitted from the client, received by the server
document.querySelector("#message-form").addEventListener("submit", (e) => {
  // Prevents the default behavior of the browser doing a full-page refresh
  e.preventDefault();
  const message = e.target.elements.message.value;
  // Emits "sendMessage" with input string as the message data
  socket.emit("sendMessage", message, (error) => {
    // This function will run when the event is acknowledged
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered.");
  });
});

// Not every browser supports the geolocation browser
document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    // Client emits "sendLocation" with an object as the data
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        // The client prints this message when the message is acknowledged
        console.log("Location shared");
      }
    );
  });
});

// server (emit) --> client (receive) --acknowledgment --> server

// client (emit) --> server (receive) --acknowledgment --> client
