import React from 'react';
import Weather from './Weather';
import Forecast from './Forecast';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {  useState } from 'react';

const App = () => {
  const [latitude, setLatitude] = useState('41.881832');
  const [longitude, setLongitude] = useState('-87.62317');
  const handleSearch = (e) => {
    e.preventDefault();
    setLatitude(latitude)
    setLongitude(longitude)
    // fetchWeatherData(latitude, longitude);
  };
  return (
    <Router>
      <div>
        <h1>Weather App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/forecast">View Forecast</Link>
            </li>
          </ul>
        </nav>
        <form onSubmit={handleSearch}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
        <Routes>
          <Route path="/" element={<Weather latitude={latitude} longitude={longitude} />} />
          <Route path="/forecast" element={<Forecast  latitude={latitude} longitude={longitude} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
