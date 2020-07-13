const request = require("request");

// API key
// const url =
("https://api.data.gov/ed/collegescorecard/v1/schools?api_key=NGSqAMa4p7cmXliXfrMMsNrFo8tNQCydFkl7SpHx");

const url = "https://pokeapi.co/api/v2/pokemon";

// "we would like to parse this request as json"
request({ url: url, json: true }, (error, response) => {
  console.log(response.body.results);
  // const data = JSON.parse(response.body);
  // console.log(data.results[0]);
  // console.log(
  // response.body.results[10].latest.aid.median_debt.completers.overall // what year does 10 represent?
});

// .debt.median_debt.completers.overall
