import React from "react";
import { UseWeatherAPPContext } from "../Context/Contex";

const WeatherDisplay = () => {
    const { state } = UseWeatherAPPContext();

    console.log("Weather Data:", state.current); // Debugging

    if (!state.current) return <div>Loading weather data...</div>;

    return (
        <div className="weather-container">
            <h2>Weather in {state.city.city}</h2>
            <p>Temperature: {Math.round(state.current.main.temp)}°C</p>
            <p>Condition: {state.current.weather[0].description}</p>
        </div>
    );
};

export default WeatherDisplay;
