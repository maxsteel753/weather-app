
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Forecast = ({latitude,longitude}) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [latitude ] = useState(latitude);
  // const [longitude] = useState(longitude);
  useEffect(() => {
    fetchForecastGridData();
  }, []);

  const fetchForecastGridData = async () => {
    try {
  

      const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
      const response = await axios.get(apiUrl);
      const forecastGridDataUrl = response.data.properties.forecast;
      const forecastGridResponse = await axios.get(forecastGridDataUrl);
      const forecastGrid = forecastGridResponse.data.properties;
      console.log(forecastGrid)
      setForecastData(forecastGrid);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching forecast grid data: ${error}`);
    }
  };
  return (
    <div className="App">
    <header className="App-header">

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
        <h1>Forecast Grid Data</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>ShortForecast</th>
                <th>Temperature</th>
                <th>Wind Speed</th>
                
              </tr>
            </thead>
            <tbody>
            
              {forecastData.periods.map((period) => (
                <tr key={period.number}>
                  <td>{formatDate(period.startTime)+" - "+formatDate(period.endTime)}</td>
                  <td>{period.shortForecast}</td>
                  <td>{period.temperature}</td>
                  <td>{period.windSpeed}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </header>
    </div>
  );
};
function formatDate(dateString) {
  const newDateString = new Date(dateString).toLocaleString();
  return newDateString;
}

export default Forecast;
