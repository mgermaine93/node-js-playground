const chalk = require("chalk");
const getNotes = require("./notes.js");

// Calls the function itself
const message = getNotes();
console.log(message);

// The methods come from the https://www.npmjs.com/package/chalk documentation
console.log(chalk.blueBright.bold.inverse("Success!"));

// Prints out "argument vector", or an array of all of the arguments provided.  Two paths are always provided:  the first is the path to the Node.js executable on the machine, the second is the path to the Node.js file.  Any additional values will be ones you provide.
console.log(process.argv[2]);

const command = process.argv[2];

console.log(process.argv);

if (command === "add") {
  console.log("Adding a note!");
} else if (command === "remove") {
  console.log("Removing note!");
}
