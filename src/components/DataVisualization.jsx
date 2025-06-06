import React from "react";
import "./DataVisualization.css";

const WIDTH = 700;
const HEIGHT = 220;
const PADDING = 40;

const DataVisualization = ({ forecast, unit, loading }) => {
  if (loading) return <div className="chart-loading">Yuklanmoqda...</div>;
  if (!forecast || forecast.length === 0) return <div className="chart-empty">Ma'lumot yo'q</div>;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const temps = forecast.map((d) => d.temp_avg);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const stepX = (WIDTH - 2 * PADDING) / (temps.length - 1);
  const scaleY = (HEIGHT - 2 * PADDING) / (max - min || 1);
  const points = temps.map((t, i) => {
    const x = PADDING + i * stepX;
    const y = HEIGHT - PADDING - (t - min) * scaleY;
    return `${x},${y}`;
  });
  return (
    <div className="data-visualization">
      <svg width={WIDTH} height={HEIGHT}>
        {/* O'x va Oy chiziqlari */}
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#bbb" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#bbb" />
        {/* Chiziqli grafik */}
        <polyline
          fill="none"
          stroke="#0d6efd"
          strokeWidth="3"
          points={points.join(" ")}
        />
        {/* Nuqtalar */}
        {temps.map((t, i) => {
          const x = PADDING + i * stepX;
          const y = HEIGHT - PADDING - (t - min) * scaleY;
          return (
            <circle key={i} cx={x} cy={y} r={5} fill="#0d6efd" />
          );
        })}
        {/* Harorat qiymatlari */}
        {temps.map((t, i) => {
          const x = PADDING + i * stepX;
          const y = HEIGHT - PADDING - (t - min) * scaleY;
          return (
            <text key={i} x={x} y={y - 10} fontSize="14" textAnchor="middle" fill="#212529">
              {Math.round(t)}{tempUnit}
            </text>
          );
        })}
      </svg>
      <div className="chart-labels">
        {forecast.map((d) => (
          <span key={d.date} className="chart-label">{d.date}</span>
        ))}
      </div>
    </div>
  );
};

export default DataVisualization;
