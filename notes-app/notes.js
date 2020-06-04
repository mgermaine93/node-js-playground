const fs = require("fs");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  // Check to see if there are any duplicate notes
  // The array will have zero items if no duplicate items are found
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log(
      "Unfortunately, that note title is already being used.  Please write a new note."
    );
  }
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
