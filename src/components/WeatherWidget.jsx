import React, { useReducer, useState } from "react";
import CitySelector from "./CitySelector";
import WeatherDisplay from "./WeatherDisplay";
import ForecastList from "./ForecastList";
import DataVisualization from "./DataVisualization";
import SettingsPanel from "./SettingsPanel";
import ErrorBoundary from "./ErrorBoundary";
import Tabs from "./Tabs";
import { useWeatherData, weatherReducer, initialState } from "../hooks/useWeatherData";
import { useTheme } from "../context/ThemeContext";
import "./WeatherWidget.css";

const TABS = [
  { key: "current", label: "Current Weather" },
  { key: "forecast", label: "Forecast" },
  { key: "stats", label: "Statistics" },
];

const WeatherWidget = () => {
  const [tab, setTab] = useState("current");
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const weather = useWeatherData(state, dispatch);
  const { theme, toggleTheme } = useTheme();

  return (
    <ErrorBoundary>
      <div className="weather-widget" style={{ width: 800, maxWidth: "100%" }}>
        <div className="widget-header">
          <h2>Weather Dashboard</h2>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <CitySelector
          city={state.city}
          onChange={(city) => dispatch({ type: "CHANGE_CITY", payload: city })}
        />
        <SettingsPanel
          unit={state.unit}
          onToggleUnit={() => dispatch({ type: "TOGGLE_UNIT" })}
          refreshRate={state.refreshRate}
          onChangeRefreshRate={(rate) =>
            dispatch({ type: "SET_REFRESH_RATE", payload: rate })
          }
        />
        <Tabs tabs={TABS} activeTab={tab} onTabChange={setTab} />
        <div className="tab-content">
          {tab === "current" && (
            <WeatherDisplay
              weather={weather.current}
              loading={state.loading}
              unit={state.unit}
            />
          )}
          {tab === "forecast" && (
            <ForecastList
              forecast={weather.forecast}
              loading={state.loading}
              unit={state.unit}
            />
          )}
          {tab === "stats" && (
            <DataVisualization
              forecast={weather.forecast}
              unit={state.unit}
              loading={state.loading}
            />
          )}
        </div>
        {state.error && (
          <div className="error-message">{state.error}</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default WeatherWidget;