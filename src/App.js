// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from "./components/Weather";
import axios from 'axios';
import LocationSearch from './components/LocationSearch';

const App = () => {
  const apiKey = '8OV5c1H8cIlhEhA2Hv8JMI0bVuuqbSBu';
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch weather data for default location on component mount
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        setErrorMsg(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    
    const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${apiKey}`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setErrorMsg('');
      setLoading(false);
    } catch (error) {
      setErrorMsg('Error fetching weather data');
      setLoading(false);
    }
  };

  const handleSearch = async (location) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.tomorrow.io/v4/geocode/search?query=${location}&apikey=${apiKey}`
      );
      const { lat, lon } = response.data.results[0].location;
      fetchWeather(lat, lon);
    } catch (error) {
      setErrorMsg('Location not found');
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Real-time Weather</h1>
      <LocationSearch onSearch={handleSearch} />
      {loading ? <h1>Loading....</h1> : <Weather weatherData={weatherData} />}
      {errorMsg && <div className="error-message">{errorMsg}</div>}
    </div>
  );
};

export default App;
