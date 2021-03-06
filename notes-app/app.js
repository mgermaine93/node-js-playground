const chalk = require("chalk");
const yargs = require("yargs");
// An object with two properties
const notes = require("./notes.js");

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
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Removes a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // Makes the title mandatory in order for the program to run
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "Lists out notes",
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Reads a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, // Makes the title mandatory in order for the program to run
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// Parses the arguments
yargs.parse();

// The version of process.argv that yargs has parsed.
// console.log(yargs.argv);
