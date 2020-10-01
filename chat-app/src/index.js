// Get the path to the folder
const path = require("path");

// Load in the express library
const express = require("express");

// Call the express function to generate a new application
const app = express();

// Get the port going
const port = process.env.PORT || 3000;

// User the path module
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// To initialize npm, first run "npm init" in the root project directory, complete the questionnaire, and submit.
// To install express, run "npm i express"
