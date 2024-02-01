import React, { useEffect } from "react";

import axios from "axios";

import cities from "../../Data/in.json";
import {UseWeatherAPPContext} from '../../Context/Contex'

const ChooseStateComponent = () =>{


    const { state: {city} , dispatch} = UseWeatherAPPContext();

    const handleChange = (e) =>{
        const selectedCity = cities.filter((city) =>{
            return city.city === e.target.value
        })[0]
        console.log(selectedCity)

        dispatch({
            type:'SET_CITY',
            payload : selectedCity
        })
    }

    // api call

    const APIKEY = '34480b98aa332da53123a0ac63a4ea9d';
    let lat = city && city.lat ? city.lat : '';
    let long = city && city.lng ? city.lng : '';
    let exclude = 'hourly,minutely';
    const URL =  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${APIKEY}`
    
    const fetchData = () =>{
        axios(URL).then((data) =>{
            // console.log(data);
            let daily = data.data.daily;
            dispatch({
                type:'SET_DAILY',
                payload: daily
            })
        })
    }

    // lifecycle method to call fetch data function

    useEffect(() =>{
        fetchData();
        // eslint-disable-next-line
    },[city])

    return (
        <>
            <div className="stateWrap">
                <select className="stateMenu" defaultValue={city} onChange={handleChange}>
                    {
                        cities && cities.length > 0 && cities.map((city) =>{
                            return (
                                <option key={`${city.population}${city.lat}`} value={city.city}>
                                    {city.city} - {city.admin_name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        </>
    )
}

export default ChooseStateComponent;