const request = require("request");
require("dotenv").config();
const weatherApiKey = process.env.WEATHER_API_KEY;
const mapboxApiKey = process.env.MAPBOX_API_KEY;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&units=imperial&APPID=${weatherApiKey}`;
const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapboxApiKey}&limit=1`;

// First argument is the url, second argument is the function to run
// The request is parsed as JSON
request({ url: weatherUrl, json: true }, (error, response) => {
  console.log(
    response.body.weather[0].main +
      ". " +
      " It is currently " +
      response.body.main.temp +
      " degrees F in Pittsburgh.  It feels like " +
      response.body.main.feels_like +
      " degrees F."
  );
});

// HTTP Request Challenge
request({ url: mapboxUrl, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];

  console.log(
    `The latitude and longitude of Los Angeles, CA, is ${latitude} and ${longitude}, respectively.`
  );
});
