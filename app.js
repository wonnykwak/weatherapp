const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the "public" folder

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var query = req.body.cityName;
  var apiKey = "5c2876fb12b0fa5ed53c1f3b2ed65d22";
  var website =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey;

  https.get(website, function (response) {
    console.log("response" + response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const faren = (temperature - 273.15) * 9/5 + 32;
      // Construct the HTML response
      const htmlResponse = `
        <div class="weather-container">
          <p class="temperature">The temperature is ${temperature} kevlin in ${query}</p>
          <p class="temperature">The temperature is ${faren} Fahrenheit in ${query}</p>
          <p class="description">The forecast is ${description}</p>
        </div>
      `;

      res.send(htmlResponse);
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
