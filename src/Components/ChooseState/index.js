import React, { useEffect } from "react";
import axios from "axios";
import cities from "../../Data/in.json";
import { UseWeatherAPPContext } from "../../Context/Contex";

const ChooseStateComponent = () => {
    const { state: { city, weather, forecast }, dispatch } = UseWeatherAPPContext();

    const handleChange = (e) => {
        const selectedCity = cities.find((c) => c.city === e.target.value);

        if (selectedCity) {
            console.log("Selected City:", selectedCity);
            dispatch({
                type: "SET_CITY",
                payload: selectedCity
            });
        }
    };

    const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

    let lat = city?.lat;
    let lon = city?.lng;

    const fetchWeatherData = async () => {
        if (!lat || !lon) {
            console.error("Latitude or Longitude is missing");
            return;
        }

        const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;
        const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`;

        try {
            const [currentRes, forecastRes] = await Promise.all([
                axios.get(CURRENT_WEATHER_URL),
                axios.get(FORECAST_URL)
            ]);

            if (currentRes.status === 200) {
                console.log("Weather Data:", currentRes.data);
                dispatch({ type: "SET_CURRENT", payload: currentRes.data });
            }

            if (forecastRes.status === 200) {
                console.log("Forecast Data:", forecastRes.data);
                const dailyForecast = forecastRes.data.list.filter((item, index) => index % 8 === 0); // Extracting daily data
                dispatch({ type: "SET_FORECAST", payload: dailyForecast });
            }
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (lat && lon) {
            fetchWeatherData();
        }
    }, [city]);

    return (
        <div className="weather-container">
            <select className="stateMenu" defaultValue={city?.city || ""} onChange={handleChange}>
                {cities.map((c) => (
                    <option key={`${c.population}${c.lat}`} value={c.city}>
                        {c.city} - {c.admin_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChooseStateComponent;
