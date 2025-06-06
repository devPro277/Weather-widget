import { renderHook, act } from "@testing-library/react";
import { useWeatherData, weatherReducer, initialState } from "../hooks/useWeatherData";
import * as api from "../services/weatherApi";

describe("useWeatherData", () => {
  it("fetches weather data", async () => {
    jest.spyOn(api, "fetchWeatherMock").mockResolvedValue({
      current: { city: "London", temp: 20, icon: "01d", description: "Clear", humidity: 50, wind: 3.2 },
      forecast: [],
    });
    let state = { ...initialState };
    const dispatch = jest.fn();
    renderHook(() => useWeatherData(state, dispatch));
    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_WEATHER" });
  });
});
