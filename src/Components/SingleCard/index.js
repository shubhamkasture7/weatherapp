import React from "react";
import dayjs from "dayjs";

const SingleCardComponent = ({ item = {}, className, onClick }) => {
    const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    console.log("SingleCardComponent Item Data:", item); // Debugging Log

    // Ensure `item.dt` is valid before processing
    const formattedDate = item?.dt ? dayjs.unix(item.dt).format("dddd") : "Unknown";
    const weekdayShort = formattedDate.slice(0, 3); // Get first 3 letters (Mon, Tue, etc.)

    // Ensure `main.temp` exists
    const celsiusTemp = item?.main?.temp !== undefined ? Math.round(item.main.temp) : "N/A";
    const fahrenheitTemp = celsiusTemp !== "N/A" ? Math.round((item.main.temp * 9/5) + 32) : "N/A";

    // Ensure `weather` array exists
    const weatherIcon = item?.weather?.[0]?.icon ?? "01d";

    return (
        <li key={item?.dt || Math.random()} className={className} onClick={onClick}>
            <img 
                alt="Weather Icon" 
                className="day-icon" 
                src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            />

            <span className="day-name">
                {weekdayShort}
            </span>

            <span className="day-temp">
                {celsiusTemp !== "N/A" ? `${celsiusTemp}°C` : "Temp Unavailable"}
            </span>

            <span className="day-temp">
                {fahrenheitTemp !== "N/A" ? `${fahrenheitTemp}°F` : ""}
            </span>
        </li>
    );
};

export default SingleCardComponent;
