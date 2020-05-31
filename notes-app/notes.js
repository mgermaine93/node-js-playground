const fs = require("fs");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  notes.push({
    title: title,
    body: body,
  });

  saveNotes(notes);
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
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
  // Value comes from the getNote function above
  getNote: getNotes,
  // Value comes from the addNote function above
  addNote: addNote,
};
