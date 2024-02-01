import React from "react";

import dayjs from "dayjs";

import { UseWeatherAPPContext } from "../../Context/Contex";

const LeftComponents = () =>{
    const {state: {city,current}} = UseWeatherAPPContext();

    const WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    if(!current)
    {
        return <div>Loading...</div>
    }
    const weekdayindex = dayjs.unix(current.dt).day();

    // this is used to convert degree celsius to Fahrenheit
    const celsiusTemp = current.temp.max;
    const fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);

    return (
        <>
            <div className="leftWrap">
                <div className="dateWrap">
                    <h2> {WEEKDAYS[weekdayindex]}</h2>
                    <span className="dateDay">
                        {dayjs.unix(current.dt).format("DD MMM YYYY")}
                    </span>
                    <span className="locationName"> {city.city} - {city.admin_name} - {city.country}</span>
                </div>

                <div className="weatherContainer">
                    <img alt="rohit" className="weatherIcon" src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}/>
                    <h3 className="weatherTemp">{Math.round(current.temp.max)} <sup>o</sup>C</h3>
                    <h3 className="weatherTemp">{fahrenheitTemp} <sup>o</sup>F</h3>
                    <h4 className="weatherTemp">{current.weather[0].main}</h4> 
                </div>
            </div>
        </>
    )
}

export default LeftComponents