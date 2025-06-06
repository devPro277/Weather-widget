import React from "react";
import "./WeatherDisplay.css";

const WeatherDisplay = ({ weather, loading, unit }) => {
  if (loading) return <div className="weather-loading">Yuklanmoqda...</div>;
  if (!weather) return <div className="weather-empty">Ma'lumot yo'q</div>;

  const tempUnit = unit === "metric" ? "°C" : "°F";
  return (
    <div className="weather-display">
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="weather-icon"
        />
        <div>
          <div className="weather-temp">
            {Math.round(weather.temp)}{tempUnit}
          </div>
          <div className="weather-desc">{weather.description}</div>
        </div>
      </div>
      <div className="weather-details">
        <div>Shahar: <b>{weather.city}</b></div>
        <div>Namlik: {weather.humidity}%</div>
        <div>Shamol: {weather.wind} m/s</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
