// The "io" function simply connects
const socket = io();

// Emit from the server and listen on the client
// Client listens for the "message" event and prints the message to the console
socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  // Prevents the default behavior of the browser doing a full-page refresh
  e.preventDefault();
  const message = e.target.elements.message.value;
  // Emits "sendMessage" with input string as the message data
  socket.emit("sendMessage", message);
});
