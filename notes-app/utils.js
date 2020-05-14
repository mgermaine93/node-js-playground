console.log("utils.js");

const city = "Lansing";

const add = function (a, b) {
  return a + b;
};

// Whatever you assign to module.exports is available as the return value from when you acquire the file.
module.exports = add;
