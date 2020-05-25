const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Adds a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // Makes the title mandatory in order for the program to run
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title: " + argv.title);
    console.log("Body: " + argv.body);
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

// Parses the arguments
yargs.parse();

// The version of process.argv that yargs has parsed.
// console.log(yargs.argv);
