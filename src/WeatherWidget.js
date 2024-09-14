import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Dallas'); // Default city
  const [input, setInput] = useState(''); // Input for the city name

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=cad11087192d49eeb9f214603241309&q=${city}`
        );
        setWeather(response.data);
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Error fetching weather data:', err);
      }
    };

    fetchWeather();
  }, [city]); // Re-run the effect when the city changes

  // Handle form submission to update the city
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setCity(input);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="weather-widget">
      <form onSubmit={handleSubmit} className="city-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        <button type="submit" className="submit-button">
          <i className="fas fa-search"></i> {/* Font Awesome search icon */}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {!weather && !error && <div className="loading">Loading...</div>}
      
      {weather && (
        <>
          <h1 className="location">Weather in {weather.location.name}</h1>
          <div className="weather-info">
            <p className="temperature">{weather.current.temp_c}°C</p>
            <p className="condition">{weather.current.condition.text}</p>
            <img
              className="weather-icon"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
