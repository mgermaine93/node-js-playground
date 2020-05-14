// Loads in the file named "utils.js" in the notes-app folder
const getNotes = require("./notes.js");

// Calls the function itself
const message = getNotes();

console.log(message);
