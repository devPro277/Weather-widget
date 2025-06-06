// Kundalik o'rtacha harorat hisoblash
export function calcDailyAverages(hourlyData) {
  // hourlyData: [{dt, temp, ...}]
  const days = {};
  hourlyData.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!days[date]) days[date] = [];
    days[date].push(item.temp);
  });
  return Object.entries(days).map(([date, temps]) => ({
    date,
    temp_avg: temps.reduce((a, b) => a + b, 0) / temps.length,
    temp_min: Math.min(...temps),
    temp_max: Math.max(...temps),
  }));
}

// Min, max, o'rtacha butun forecast uchun
export function getForecastStats(forecast) {
  const allTemps = forecast.flatMap((d) => [d.temp_min, d.temp_max, d.temp_avg]);
  return {
    min: Math.min(...allTemps),
    max: Math.max(...allTemps),
    avg: allTemps.reduce((a, b) => a + b, 0) / allTemps.length,
  };
}

// Custom sort (date, time)
export function sortByDateTime(arr) {
  return arr.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}
