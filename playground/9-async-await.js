// Async functions always return a promise
// The promise is fulfilled with the value the developer chooses to return from the function

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Numbers must be positive.");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  // Since the add function returns a promise, await can be used here
  const sum = await add(14, 5);
  const sum2 = await add(sum, -23);
  const sum3 = await add(sum2, 213);
  return sum3;
};

doWork()
  .then((result) => {
    console.log("Here's the result: ", result);
  })
  .catch((error) => {
    console.log("Here's the error: ", error);
  });
