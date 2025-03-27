import React from "react";
import { UseWeatherAPPContext } from "../../Context/Contex";

const HUMIDITYComponents = () => {
    const { state: { current, city } } = UseWeatherAPPContext();

    if (!current || !city) {
        return <div className="loading">Loading weather data...</div>;
    }

    // Extract values correctly
    const temperature = Math.round(current.main.temp); // Current temperature
    const minTemp = Math.round(current.main.temp_min);
    const maxTemp = Math.round(current.main.temp_max);
    const humidity = current.main.humidity;
    const windSpeed = Math.round(current.wind.speed);
    const uvIndex = current.uvi || "N/A"; // OpenWeatherAPI may not return UVI

    return (
        <div className="humidityWrap">
            <h2 className="sectionTitle">Weather Details</h2>

            <div className="humidityData">
                <div className="title">Temperature</div>
                <div className="value">{temperature} <sup>o</sup>C</div>
            </div>

            <div className="humidityData">
                <div className="title">Min Temperature</div>
                <div className="value">{minTemp} <sup>o</sup>C</div>
            </div>

            <div className="humidityData">
                <div className="title">Max Temperature</div>
                <div className="value">{maxTemp} <sup>o</sup>C</div>
            </div>

            <div className="humidityData">
                <div className="title">Humidity</div>
                <div className="value">{humidity} %</div>
            </div>

            <div className="humidityData">
                <div className="title">Wind Speed</div>
                <div className="value">{windSpeed} km/h</div>
            </div>

            <div className="humidityData">
                <div className="title">UV Index</div>
                <div className="value">{uvIndex}</div>
            </div>
        </div>
    );
};

export default HUMIDITYComponents;
