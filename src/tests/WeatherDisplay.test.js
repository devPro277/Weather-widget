import React from "react";
import { render } from "@testing-library/react";
import WeatherDisplay from "../components/WeatherDisplay";

describe("WeatherDisplay", () => {
  it("renders correctly", () => {
    const weather = {
      city: "London",
      temp: 20,
      icon: "01d",
      description: "Clear",
      humidity: 50,
      wind: 3.2,
    };
    const { asFragment } = render(
      <WeatherDisplay weather={weather} loading={false} unit="metric" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
