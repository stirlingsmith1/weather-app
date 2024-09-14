import React from 'react';
import WeatherWidget from './WeatherWidget';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to My Weather App</h1> 
      <WeatherWidget />
    </div>
  );
}

export default App;
