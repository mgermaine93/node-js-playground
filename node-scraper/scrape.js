const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.homelessshelterdirectory.org/cgi-bin/id/cityfoodbanks.cgi?city=Pittsburgh&state=PA",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const pantryDetails = $(".item_content");
      // console.log(pantryDetails.html());
      const pantryName = $(".item_content h4 a");
      // console.log(pantryName.html());
      const pantryLocation = $(".item_content p").html().split("<", 1)[0];
      console.log(pantryLocation);
      const pantryZipCode = pantryLocation.slice(-5);
      console.log(pantryZipCode);
      const pantryPhoneNumber = $(".item_content p").html().split("<br>", 1)[0];
      console.log(pantryPhoneNumber);

      // console.log(pantryName.html());
      // console.log(pantryLocation.html());

      //$(".item_content h4 a").each((i, el) => {
      //const item = $(el).text();
      //const link = $(el).attr("href");
      //console.log(item);
      //});
    }
  }
);
