const request = require("request");
require("dotenv").config(); // Adds .dotenv references to the API keys.
const mapboxApiKey = process.env.MAPBOX_API_KEY;

// encodeURIComponent() catches any special characters that may mean something to the URL call
// "response" was an object... object destructuring is used in to get "mapboxUrl" and "body" below
const geocode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxApiKey}&limit=1`;
  request({ url: mapboxUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to weather service.  Check your internet connection and try again?",
        undefined
      );
    } else if (body.features.length === 0) {
      callback("Unable to find location.  Try another search?", undefined);
    } else {
      // "error" will be undefined, since this statement is if stuff goes well
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// Exports the module
module.exports = geocode;
