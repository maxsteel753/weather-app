
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({latitude,longitude}) => {
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState('');
  // const [latitude ] = useState(latitude);
  // const [longitude] = useState(longitude);
  useEffect(() => {
    fetchWeatherData(latitude, longitude);
  }, [latitude,longitude]);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
      const response = await axios.get(apiUrl).catch(function (error) {
        if (error.response) {
          console.log('invalid Input');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        };
      });
      const city = response.data.properties.relativeLocation.properties.city;
      const forecast = response.data.properties.forecast;
      setCityName(city);
      fetchForecastData(forecast);
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
    }
  };

  const fetchForecastData = async (forecastUrl) => {
    try {
      const response = await axios.get(forecastUrl);
      const weatherDescription = response.data.properties.periods[0].detailedForecast;
      setWeather(weatherDescription);
    } catch (error) {
      console.error(`Error fetching forecast data: ${error}`);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
  
     
        <div>
          <h1>{cityName}</h1>
          <p>{weather }</p>
        </div>
      </header>
    </div>
  );
}

export default Weather;
