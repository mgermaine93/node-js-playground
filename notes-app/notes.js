const fs = require("fs");
const chalk = require("chalk");

// Add note function
const addNote = (title, body) => {
  const notes = loadNotes();

  // Check to see if there are any duplicate notes
  // The array will have zero items if no duplicate items are found

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(
      chalk.red.inverse(
        "Unfortunately, that note title is already being used.  Please write a new note."
      )
    );
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notes);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }

  saveNotes(notesToKeep);
};

// Create the listNotes function
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// Create readNotes function
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse.green(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.inverse.red("No note found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  // Try doing this...
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    // If the above doesn't work, do this
  } catch (error) {
    // If there is no file, return an empty array
    return [];
  }
};

// Exports the file.
module.exports = {
  // Value comes from the addNote function above
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
