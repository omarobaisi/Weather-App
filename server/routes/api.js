const express = require("express");
const router = express.Router();
const City = require("../models/City");
const axios = require("axios");

const getGeocoding = async (cityName, APIKey) => {
  try {
    let geocoding = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`);
    const lat = geocoding.data[0].lat;
    const lon = geocoding.data[0].lon;
    return { lat, lon }
  } catch(e) {
    console.log(e)
  }
}

const getWeather = async (cityName, lat, lon, APIKey) => {
  try {
    let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`);
    weather = weather.data;
    const iconCode = weather.weather[0].icon;
    return {
      name: cityName,
      temperature: weather.main.temp,
      condition: weather.weather[0].main,
      conditionPic: `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
    }
  } catch(e) {
    console.log(e)
  }
}

router.get("/city/:cityName", async (req, res) => {
  const cityName = req.params.cityName;
  const APIKey = "ac80bd3465852cf7e1aa2f28c9a4dfc1";
  try {
    const { lat, lon } = await getGeocoding(cityName, APIKey);
    let weather = await getWeather(cityName, lat, lon, APIKey);
    res.send(weather);
  } catch(e) {
    console.log(e);
  }
});

router.get("/cities", async (req, res) => {
  try {
    const allCities = await City.find({});
    res.send(allCities);
  } catch(e) {
    console.log(e);
  }
});

router.post("/city", async (req, res) => {
  const newCity = req.body;
  const newWeather = new City(newCity);
  try {
    const weather = await newWeather.save();
    res.send(weather);
  } catch(e) {
    console.log(e)
  }
});

router.delete("/city/:cityName", async (req, res) => {
  const cityName = req.params.cityName;
  try {
    const removedCity = await City.findOneAndDelete( { name: cityName }, { new: true } )
    res.send(removedCity);
  } catch(e) {
    console.log(e)
  }
});

module.exports = router;