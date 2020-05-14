// Challenge:  Define and use a function in a new file.
//  1. Create a new file called notes.js.
//  2. Create getNotes function returns "Your notes..."
//  3. Export getNotes function.
//  4. From app.js, load in and call the function printing message to console.

const getNotes = function () {
  return "Your notes...";
};

// Exports the file.
module.exports = getNotes;
