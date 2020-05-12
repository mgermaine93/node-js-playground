// The "require" function is how you load in Node modules
const fs = require("fs");

// First argument is the file to write to, second argument is the contents to put into the file
fs.writeFileSync("notes.txt", "First Node.js Note \n");

// Challenge
// 1) Use appendFileSync to append to the file

fs.appendFileSync("notes.txt", "Second Node.js Note \n");

// 2) Run the script (DONE)

// 3) Check your work (DONE)
