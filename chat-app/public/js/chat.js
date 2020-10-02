// The "io" function simply connects
const socket = io();

// Emit from the server and listen on the client
socket.on("countUpdated", (count) => {
  console.log("The count has been updated!", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  // Each time the button is clicked, "Click" prints to the console
  console.log("Click");
  // Emit from the client and listen on the server
  socket.emit("increment");
});
