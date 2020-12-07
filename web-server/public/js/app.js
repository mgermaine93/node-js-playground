// This client-side file fetches the forecast information
console.log("This is the client-side JavaScript file.");

// "fetch data from this url and then run this function"
fetch("http://localhost:3000/weather?address=pittsburgh").then((response) => {
  // this function runs when the JSON data has arrived and been parsed
  response.json().then((data) => {
    console.log(data);
    if (data.error) {
      console.log(data.error);
    }
    console.log(data.forecast);
    console.log(data.location);
  });
});
