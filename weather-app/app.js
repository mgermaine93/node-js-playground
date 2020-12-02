const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Accesses the location command-line argument that the user provides
const address = process.argv[2];

if (!address) {
  console.log("Please provide an address.");
} else {
  // Two arguments are typically passed in to callbacks: "error" and "data"/"response"
  // To change what city you're searching for, pass it in here
  // Data is an object
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }
    // latitude, longitude, function
    forecast(latitude, longitude, (error, forecastData) => {
      // Callback chaining in action
      if (error) {
        return console.log(error);
      }
      // This is what runs if BOTH requests work successfully
      console.log(location);
      console.log(forecastData);
    });
  });
}

//-75.7088, 44.1545
