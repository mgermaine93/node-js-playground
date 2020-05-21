const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Adds a new note",
  handler: function () {
    console.log("Adding a new note");
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Removes a new note",
  handler: function () {
    console.log("Removing a note");
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "Lists out notes",
  handler: function () {
    console.log("This lists out all notes");
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Reads a note",
  handler: function () {
    console.log("This reads a note");
  },
});

// The version of process.argv that yargs has parsed.
console.log(yargs.argv);
