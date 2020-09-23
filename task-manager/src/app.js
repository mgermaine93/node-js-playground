// This file sets up the express application and exports the app
///////////////////// CONSTANTS /////////////////////
require("dotenv").config({ path: "./config/dev.env" });
const express = require("express");
require("./db/mongoose"); // This ensures a connection to the database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());
app.use(userRouter); // <-- Registers the user router... important!
app.use(taskRouter); // <-- Register the task router... important!

module.exports = app;
