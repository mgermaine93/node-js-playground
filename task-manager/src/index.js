// index.js creates the express app and gets it up and running
// The router files determine what the app actually does

///////////////////// CONSTANTS /////////////////////

const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
// If the first port doesn't work, use local port 3000
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000, // size is in bytes
  },
  // Determines which file types are allowed
  // cb = lets multer know when we're done filtering the file
  fileFilter(request, file, cb) {
    // Uses regex
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      // This will run if the file is NOT a pdf
      return cb(new Error("Please upload a Word document"));
    }
    cb(undefined, true);
  },
});
// Configures the server to upload and save files
// Multer looks for the file named "upload" in the request
app.post(
  "/upload",
  upload.single("upload"),
  (request, response) => {
    response.send();
  },
  (error, request, response, next) => {
    response.status(400).send({ error: error.message });
  }
);

app.use(express.json());
app.use(userRouter); // <-- Registers the user router... important!
app.use(taskRouter); // <-- Register the task router... important!

// Prints out the port that the server is on when the nodemon is up and running
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
