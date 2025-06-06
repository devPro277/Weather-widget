import { useEffect } from "react";
import { fetchWeatherMock } from "../services/weatherApi";

export const initialState = {
  city: "London",
  unit: "metric", // 'metric' (C) yoki 'imperial' (F)
  refreshRate: 10, // sekund
  loading: false,
  error: null,
  weather: null,
  forecast: [],
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "FETCH_WEATHER":
      return { ...state, loading: true, error: null };
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        weather: action.payload.current,
        forecast: action.payload.forecast,
        error: null,
      };
    case "CHANGE_CITY":
      return { ...state, city: action.payload };
    case "TOGGLE_UNIT":
      return { ...state, unit: state.unit === "metric" ? "imperial" : "metric" };
    case "SET_REFRESH_RATE":
      return { ...state, refreshRate: action.payload };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function useWeatherData(state, dispatch) {
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      dispatch({ type: "FETCH_WEATHER" });
      try {
        const data = await fetchWeatherMock(state.city, state.unit);
        if (isMounted) {
          dispatch({
            type: "FETCH_WEATHER_SUCCESS",
            payload: data,
          });
        }
      } catch (err) {
        if (isMounted) {
          dispatch({ type: "SET_ERROR", payload: err.message || "API error" });
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [state.city, state.unit]);

  return {
    current: state.weather,
    forecast: state.forecast,
  };
}
