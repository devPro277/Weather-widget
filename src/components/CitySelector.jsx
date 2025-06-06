import React, { useState } from "react";
import debounce from "../utils/debounce";
import "./CitySelector.css";

const CITIES = ["London", "New York", "Tokyo", "Sydney", "Cairo"];

const CitySelector = ({ city, onChange }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = debounce((val) => {
    setSearch(val);
    setError("");
  }, 300);

  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (e) => {
    const val = e.target.value;
    if (!CITIES.includes(val)) {
      setError("Faqat ro'yxatdagi shaharlardan tanlang!");
      return;
    }
    setError("");
    onChange(val);
  };

  return (
    <div className="city-selector">
      <input
        type="text"
        placeholder="Shahar qidiring..."
        onChange={(e) => handleSearch(e.target.value)}
        className="city-search"
      />
      <select value={city} onChange={handleSelect} className="city-dropdown">
        {filtered.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {error && <div className="city-error">{error}</div>}
    </div>
  );
};

export default CitySelector;
