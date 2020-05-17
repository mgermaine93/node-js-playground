// Challenge:  Use the Chalk Library in your project
// 1. Install version 2.4.1 of Chalk
// 2. Load Chalk into app.js
// 3. Use it to print the string "Success!" into the console in green text
// 4. Test your work
// Bonus:  Make text bold and inversed

const chalk = require("chalk");
const getNotes = require("./notes.js");

// Calls the function itself
const message = getNotes();
console.log(message);

// The methods come from the https://www.npmjs.com/package/chalk documentation
console.log(chalk.red.bold.inverse("Error!"));
