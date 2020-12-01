const request = require("request");
require("dotenv").config(); // Adds .dotenv references to the API keys.
const weatherApiKey = process.env.WEATHER_API_KEY;

const forecast = (latitude, longitude, callback) => {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to weather service.  Check you internet connection and try again?",
        undefined
      );
      // If the error code indicates anything but a success...
    } else if (response.body.cod !== 200) {
      callback("Unable to find location.  Try another search?", undefined);
    } else {
      const weatherOutlook = response.body.weather[0].main;
      const mainTemp = response.body.main.temp;
      const feelsLikeTemp = response.body.main.feels_like;
      callback(
        undefined,
        `${weatherOutlook}.  It is currently ${mainTemp} degrees Fahrenheit outside, but it feels like ${feelsLikeTemp} degrees Fahrenheit.`
      );
    }
  });
};

// Exports the module
module.exports = forecast;
