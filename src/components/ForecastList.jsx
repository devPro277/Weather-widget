import React from "react";
import "./ForecastList.css";

const ForecastList = ({ forecast, loading, unit }) => {
  if (loading) return <div className="forecast-loading">Yuklanmoqda...</div>;
  if (!forecast || forecast.length === 0) return <div className="forecast-empty">Ma'lumot yo'q</div>;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  return (
    <div className="forecast-list">
      {forecast.map((day) => (
        <div className="forecast-card" key={day.date}>
          <div className="forecast-date">{day.date}</div>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.description}
            className="forecast-icon"
          />
          <div className="forecast-temp">
            <span>Min: {Math.round(day.temp_min)}{tempUnit}</span>
            <span>Max: {Math.round(day.temp_max)}{tempUnit}</span>
          </div>
          <div className="forecast-desc">{day.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
