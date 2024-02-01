import React from "react";
import dayjs from "dayjs";


const SingleCardComponents = ({item , className , onClick}) =>{

    const WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    const weekdayindex = dayjs.unix(item.dt).day();

    const celsiusTemp = item.temp.max;
    const fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);
    return (
        <>
            <li key={item.moonrise} className={className} onClick={onClick}>

                <img alt="rohit" className="day-icon" 
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>

                <span className="day-name">
                    {WEEKDAYS[weekdayindex].slice(0,3)}
                </span>

                <span className="day-temp">
                    {Math.round(item.temp.max)} <sup>o</sup>C
                </span>

                <span className="day-temp">
                    {fahrenheitTemp} <sup>o</sup>F
                </span>
            </li>
        </>
    )
}

export default SingleCardComponents;