const request = require("request");
require("dotenv").config(); // Adds .dotenv references to the API keys.
const weatherApiKey = process.env.WEATHER_API_KEY;
const mapboxApiKey = process.env.MAPBOX_API_KEY;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&units=imperial&APPID=${weatherApiKey}`;
const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapboxApiKey}&limit=1`;

// First argument is the url, second argument is the function to run
// The request is parsed as JSON
request({ url: weatherUrl, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service.  Try again?");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location.  Try another search?");
  } else {
    const weatherOutlook = response.body.weather[0].main;
    const mainTemp = response.body.main.temp;
    const feelsLikeTemp = response.body.main.feels_like;
    console.log(
      `${weatherOutlook}.  It is currently ${mainTemp} degrees in Pittsburgh.  It feels like ${feelsLikeTemp}.`
    );
  }
});

// HTTP Request Challenge
request({ url: mapboxUrl, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service.  Try again?");
  } else if (response.body.error) {
    console.log("Unable to find location.");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(
      `The latitude and longitude of Los Angeles, CA, is ${latitude} and ${longitude}, respectively.`
    );
  }
});
