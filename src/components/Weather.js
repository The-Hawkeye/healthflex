import React from 'react';

const Weather = ({ weatherData }) => {
  if (!weatherData) {
    return null; // If weatherData is not yet available, return null
  }

  const { data, location } = weatherData;

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      <div>
        <strong>Location:</strong> {location.lat}, {location.lon}
      </div>
      <div>
        <strong>Time:</strong> {new Date(data.time).toLocaleString()}
      </div>
      <div>
        <strong>Temperature:</strong> {data.temperature}°C
      </div>
      <div>
        <strong>Apparent Temperature:</strong> {data.temperatureApparent}°C
      </div>
      <div>
        <strong>Humidity:</strong> {data.humidity}%
      </div>
      <div>
        <strong>Cloud Cover:</strong> {data.cloudCover}
      </div>
    </div>
  );
};

export default Weather;
