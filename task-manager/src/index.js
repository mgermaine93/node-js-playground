// index.js creates the express app and gets it up and running
// The router files determine what the app actually does

///////////////////// CONSTANTS /////////////////////
const app = require("./app");

// Environment variable
// If the first port doesn't work, use local port 3000
const port = process.env.PORT; // || 3000;

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
