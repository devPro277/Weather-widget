import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import WeatherWidget from "./components/WeatherWidget";
import "./App.css";
import "./theme.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <WeatherWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;