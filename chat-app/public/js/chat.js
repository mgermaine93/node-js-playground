// CLIENT

// This connects to the server
const socket = io();

// This receives the event sent from the server
socket.on('countUpdated', (count) => {
    console.log("The count has been updated!", count);
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log("Clicked.");
    socket.emit('increment');
});