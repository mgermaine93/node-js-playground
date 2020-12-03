///// Gets the API response using core modules, not the "request" library /////

// Loads in the core module from the documentation
const https = require("https");
const weatherApiKey = process.env.WEATHER_API_KEY;
require("dotenv").config(); // Adds .dotenv references to the API keys.

// Loads in the URL
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=40&lon=-75&units=imperial&appid=${weatherApiKey}`;

// The request method retrieves the request itself and stores it to the variable "request"
const request = https.request(weatherUrl, (response) => {
  // data will have a different value over time, hence "let"
  let data = "";
  // "data" is the handler
  response.on("data", (chunk) => {
    // Converts the buffer to a string
    data = data + chunk.toString();
    console.log(chunk);
  });

  // Waits for the "end" event to tell when we're done
  response.on("end", (error) => {
    // "data" is no an object that can be parsed
    const body = JSON.parse(data);
    console.log(body);
  });
});

// Adds error handling
request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
