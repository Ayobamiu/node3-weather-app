const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Geocode and forcast
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: " New App",
    name: "Usman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App -About Page",
    name: "Usman",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App - Help Page",
    name: "Usman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "Provide an Address!!" });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(data.longitude, data.latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        const { latitude, longitude, location } = data;
        const { weather_descriptions, temperature, rain_chance } = forecastData;
        res.send({
          location: location,
          address: req.query.address,
          latitude: latitude,
          longitude: longitude,
          weather_descriptions: weather_descriptions,
          temperature: temperature,
          rain_chance: rain_chance,
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Article not found",
    pageText: "Help Article not found",
    name: "Usman",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "Provide a search term!!" });
  } else {
    console.log(req.query);
    res.send({ products: [] });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    pageText: "Page not found",
    name: "Usman",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
