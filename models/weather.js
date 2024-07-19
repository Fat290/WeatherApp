import { useState } from 'react';


export default class Weather {
  constructor(data) {
    this.name = data.name;
    this.temp = data.main.temp;
    this.feels_like = data.main.feels_like;
    this.minTemp = data.main.temp_min;
    this.maxTemp = data.main.temp_max;
    this.pressure = data.main.pressure;
    this.humidity= data.main.humidity;
    this.sea_level = data.main.sea_level;
    this.grnd_level = data.main.grnd_level;
    this.visibility= data.visibility;
    this.description = data.weather[0].description;
    this.main = data.weather[0].main;
    this.windSpeed = data.wind.speed;
    this.cloudiness = data.clouds.all;
    this.sunrise = data.sys.sunrise;
    this.sunset = data.sys.sunset;
  }

  kelvinToCelsius() {
    return (this.temp - 273.15).toFixed(0);
  }
  
  isDaytime() {
    const now = Math.floor(Date.now() / 1000);
    return now >= this.sunrise && now < this.sunset;
  }
}

