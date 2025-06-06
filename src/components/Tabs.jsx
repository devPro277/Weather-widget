import React from "react";
import "./Tabs.css";

const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="tabs">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        className={`tab-btn${activeTab === tab.key ? " active" : ""}`}
        onClick={() => onTabChange(tab.key)}
        type="button"
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs;
