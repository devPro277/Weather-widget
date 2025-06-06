import React from "react";
import "./SettingsPanel.css";

const SettingsPanel = ({ unit, onToggleUnit, refreshRate, onChangeRefreshRate }) => {
  return (
    <div className="settings-panel">
      <div>
        <label>Birlik: </label>
        <button className="unit-toggle" onClick={onToggleUnit}>
          {unit === "metric" ? "°C" : "°F"}
        </button>
      </div>
      <div>
        <label>Yangilanish (sek): </label>
        <input
          type="number"
          min={5}
          max={60}
          value={refreshRate}
          onChange={(e) => onChangeRefreshRate(Number(e.target.value))}
          className="refresh-input"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
