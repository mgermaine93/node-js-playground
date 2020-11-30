// const doWorkCallback = (callback) => {
//   setTimeout(() => {
//     // callback("This is my error message!", undefined);
//     callback(undefined, [1, 2, 3, 4, 5, 6]);
//   }, 2000);
// };

// doWorkCallback((error, result) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(result);
// });

// // "address" is the address to geocode, "callback" is the function run
// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = { latitude: 0, longitude: 0 };
//     // The callback function is called with the appropriate data when we have it
//     // It's essentially the same as a "return" statement
//     callback(data);
//   }, 2000);
// };

// geocode("Pittsburgh", (data) => {
//   console.log(data);
// });

// Callback function challenge

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(sum); // should print 5
});
