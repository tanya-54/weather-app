import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'ee1f2a6f59f63999a95cd462b0f96a5d';

  const searchLocation = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );

      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError('Error fetching weather data. Please check the location and try again.');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              searchLocation();
            }
          }}
          type="text"
        />
      </div>

      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              <h2>{weatherData.name}</h2>
            </div>
            <div className="temp">
              <h2>{weatherData.main.temp} °C</h2>
            </div>
            <div className="description">
              {weatherData.weather && weatherData.weather.length > 0 && (
                <p>{weatherData.weather[0].description}</p>
              )}
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className='bold'>{weatherData.main.feels_like}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className='bold'>{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind && (
                <p>{weatherData.wind.speed} MPH</p>
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
