import React, { useReducer, useContext, useEffect } from "react";
import WeatherReducer from "./Reducer"; // Ensure correct import

const WeatherAPPContext = React.createContext();

const WeatherAPPProvider = ({ children }) => {
    const initialState = {
        city: {
            city: "Delhi",
            lat: "28.6600",
            lng: "77.2300",
            country: "India",
            iso2: "IN",
            admin_name: "Delhi",
            capital: "admin",
            population: "29617000",
            population_proper: "16753235"
        },
        current: null,
        daily: null
    };

    const [state, dispatch] = useReducer(WeatherReducer, initialState);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const API_KEY = "34480b98aa332da53123a0ac63a4ea9d"; // Replace with actual API key
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${state.city.lat}&lon=${state.city.lng}&units=metric&appid=${API_KEY}`;

                const response = await fetch(url);
                const data = await response.json();

                console.log("Fetched Weather Data:", data); // Debugging

                if (data.cod === "200") {
                    dispatch({ type: "SET_CURRENT", payload: data.list[0] }); // Set current weather
                    dispatch({ type: "SET_DAILY", payload: data.list }); // Set full forecast
                } else {
                    console.error("API Error:", data.message);
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, [state.city]); // Fetch weather whenever the city changes

    return (
        <WeatherAPPContext.Provider value={{ state, dispatch }}>
            {children}
        </WeatherAPPContext.Provider>
    );
};

export default WeatherAPPProvider;

export const UseWeatherAPPContext = () => {
    const context = useContext(WeatherAPPContext);
    if (!context) {
        throw new Error("UseWeatherAPPContext must be used within a WeatherAPPProvider");
    }
    return context;
};
