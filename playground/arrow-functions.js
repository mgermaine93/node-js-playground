// const square = function (x) {
//   return x * x;
// };

// const square = () => {
//     return x * x;
// }

// const square = (x) => x * x;

// console.log(square(3));

const event = {
  name: "Pittsburgh Marathon",
  // This is still standard function with access to "this" binding, etc.
  participantList: [
    "Mo Farah",
    "Bill Rodgers",
    "Jordan Hasay",
    "Eliud Kipchoge",
    "Joan Benoit Samuelson",
  ],
  printParticipantList() {
    console.log("Participant list for the " + this.name);
    this.participantList.forEach((participant) => {
      console.log(participant + " is attending the " + this.name);
    });
  },
};

event.printParticipantList();

// Key Takeaways

// 1) Alternative syntax
// 2) Shorthand syntax (as seen above in the second example)
// 3) Arrow function do NOT bind their own "this" value
