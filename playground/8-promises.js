// Accepts two numbers, a and b
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

//// WITHOUT PROMISE CHAINING ////

// add(1, 2)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 5)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((error2) => {
//         console.log(error2);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//// WITH PROMISE CHAINING ////

add(1, 1)
  // This runs when the add(1, 1) promise is fulfilled
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  // This run when the add(sum, 4) promise is fulfilled
  .then((sum2) => {
    console.log(sum2);
  })
  // This occurs when neither of the above are fulfilled
  .catch((error) => {
    console.log(error);
  });
