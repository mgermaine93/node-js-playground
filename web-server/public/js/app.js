// This client-side file fetches the forecast information
// console.log("This is the client-side JavaScript file.");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

// This is the code that runs when someone submits the form

weatherForm.addEventListener("submit", (e) => {
  // Prevents the server from refreshing and rendering a new page automatically
  e.preventDefault();

  // This extracts the value of whatever was entered in the search form
  const location = searchElement.value;

  // "fetch data from this url and then run this function"
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      // this function runs when the JSON data has arrived and been parsed
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        console.log(data.forecast);
        console.log(data.location);
      });
    }
  );
});
