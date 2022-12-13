const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true}));

app.get("", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    console.log(req.body.cityName);

const query = req.body.cityName;
const units = "metric";
const APPID ="f237a9d6842de4ba7b69517bce1fdcdf"

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&APPID=" + APPID + "&units=" + units;

https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData =JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        var tempRounded = Math.floor(temp);
        const weatherDescription = weatherData.weather[0].description;
        const iconId = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png"
        console.log(temp);
        console.log(weatherDescription);
        res.write("<p>The weather is currently " + weatherDescription + ".</p>");
        res.write("<h1>The temperature in " + query + " is "+ tempRounded + " degrees Celcius. </h1>");
        res.write("<img src="+ iconUrl +">");
        res.send();
    })
})
})

app.listen(3000, function() {
    console.log("Server is running")
})