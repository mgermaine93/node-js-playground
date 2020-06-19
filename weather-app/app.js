console.log("Starting");

setTimeout(() => {
  console.log("2-second timer");
}, 2000); // # of milliseconds you want to wait before the callback is executed

setTimeout(() => {
  console.log("0-second timer");
}, 0); // run the function right away

console.log("Stopping");
