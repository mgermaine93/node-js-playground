const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Two arguments are typically passed in to callbacks: "error" and "data"/"response"
// To change what city you're searching for, pass it in here
geocode("Berkley", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

// latitude, longitude, function
forecast(-75.7088, 44.1545, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
