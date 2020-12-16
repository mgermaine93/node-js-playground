const request = require("request");
require("dotenv").config(); // Adds .dotenv references to the API keys.
const weatherApiKey = process.env.WEATHER_API_KEY;

const forecast = (latitude, longitude, callback) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to weather service.  Check you internet connection and try again?",
        undefined
      );
      // If the error code indicates anything but a success...
    } else if (body.cod !== 200) {
      callback("Unable to find location.  Try another search?", undefined);
    } else {
      const weatherOutlook = body.weather[0].main;
      const weatherDescription = body.weather[0].description;
      const mainTemp = Math.round(body.main.temp);
      const feelsLikeTemp = Math.round(body.main.feels_like);
      callback(
        undefined,
        `${weatherOutlook}, ${weatherDescription}.  It is currently ${mainTemp} degrees Fahrenheit outside, but it feels like ${feelsLikeTemp} degrees Fahrenheit.`
      );
    }
  });
};

// Exports the module
module.exports = forecast;
