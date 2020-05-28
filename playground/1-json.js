// Loads in the fs module
const fs = require("fs");

// Reads the (binary) file in
const dataBuffer = fs.readFileSync("1-json.json");

// Converts the data into a standard string in JavaScript
const dataJSON = dataBuffer.toString();

// Parses the data into an object
const data = JSON.parse(dataJSON);

// Update these to overwrite JSON properties if needed
data.title = "Infinite Jest";
data.author = "David Foster Wallace";
data.publicationYear = "1996";

const bookJSON = JSON.stringify(data);
fs.writeFileSync("1-json.json", bookJSON);
