// Mock API for weather data
const ICONS = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d"];
const DESCS = ["Clear", "Clouds", "Rain", "Snow", "Thunderstorm", "Mist"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomIcon() {
  return ICONS[Math.floor(Math.random() * ICONS.length)];
}

function getRandomDesc() {
  return DESCS[Math.floor(Math.random() * DESCS.length)];
}

export async function fetchWeatherMock(city, unit) {
  await new Promise((r) => setTimeout(r, 500)); // Simulate network
  if (!["London", "New York", "Tokyo", "Sydney", "Cairo"].includes(city)) {
    throw new Error("Shahar topilmadi");
  }
  // Current weather
  const temp = unit === "metric" ? random(10, 30) : random(50, 90);
  const weather = {
    city,
    temp,
    temp_min: temp - 2,
    temp_max: temp + 2,
    temp_avg: temp,
    humidity: Math.round(random(40, 80)),
    wind: random(1, 8).toFixed(1),
    icon: getRandomIcon(),
    description: getRandomDesc(),
  };
  // 5-day forecast
  const forecast = Array.from({ length: 5 }).map((_, i) => {
    const base = unit === "metric" ? random(10, 30) : random(50, 90);
    return {
      date: new Date(Date.now() + i * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      temp_min: base - 3,
      temp_max: base + 3,
      temp_avg: base,
      icon: getRandomIcon(),
      description: getRandomDesc(),
    };
  });
  return { current: weather, forecast };
}
