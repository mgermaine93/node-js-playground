const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1, 2, 3, 4, 5, 6]);
    reject("Things went wrong!");
  }, 2000);
});

// This function only gets executed when things go well
doWorkPromise
  .then((result) => {
    console.log("Success!", result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
