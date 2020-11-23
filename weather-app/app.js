const request = require("request");
require("dotenv").config();
const apiKey = process.env.API_KEY;
const url = `http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&units=imperial&APPID=${apiKey}`;

// First argument is the url, second argument is the function to run
// The request is parsed as JSON
request({ url: url, json: true }, (error, response) => {
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
