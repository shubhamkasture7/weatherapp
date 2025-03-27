import React from "react";
import dayjs from "dayjs";
import { UseWeatherAPPContext } from "../../Context/Contex";

const LeftComponents = () => {
    const { state: { city, current } } = UseWeatherAPPContext();

    const WEEKDAYS = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    if (!current || !city) {
        return <div>Loading...</div>;
    }

    // Get weekday index from Unix timestamp
    const weekdayIndex = dayjs.unix(current.dt).day();

    // Check if temp structure is from OneCall API or Weather API
    const celsiusTemp = current.temp?.max || current.main?.temp;  
    const fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);

    return (
        <div className="leftWrap">
            <div className="dateWrap">
                <h2>{WEEKDAYS[weekdayIndex]}</h2>
                <span className="dateDay">
                    {dayjs.unix(current.dt).format("DD MMM YYYY")}
                </span>
                <span className="locationName">
                    {city.city} - {city.admin_name} - {city.country}
                </span>
            </div>

            <div className="weatherContainer">
                <img 
                    alt="weather icon" 
                    className="weatherIcon" 
                    src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} 
                />
                <h3 className="weatherTemp">
                    {Math.round(celsiusTemp)} <sup>o</sup>C
                </h3>
                <h3 className="weatherTemp">
                    {fahrenheitTemp} <sup>o</sup>F
                </h3>
                <h4 className="weatherTemp">
                    {current.weather[0].main}
                </h4> 
            </div>
        </div>
    );
};

export default LeftComponents;
