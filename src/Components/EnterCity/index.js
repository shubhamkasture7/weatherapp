import React , {useEffect , useState} from "react";
import { UseWeatherAPPContext } from "../../Context/Contex";
import cities from "../../Data/in.json";
import axios from "axios";

const Cityinput =() =>{
    const [cities , setcity] = useState({city: 'pune',lat:'18.5203',long:'73.8567'});
    const [selectedCity , selectedsetCity] = useState({city: 'pune',lat:'18.5203',long:'73.8567'});
    const {state : {city} , dispatch} = UseWeatherAPPContext();

    const handlesubmit = (e) =>{
        if(e.key != 'Enter')
        {
            return;
        }
        let currentcity = document.getElementById('cityinput').value
        currentcity = currentcity.toLowerCase();
        currentcity = currentcity[0].toUpperCase() + currentcity.substring(1);

        const citydata = cities.map((city) =>{
            return {'city':city.city , 'lat': city.lat , 'long':city.lat}
        })

        dispatch({
            type: 'SET_CITY',
            payload: currentcity
        })

        const selectedCity = citydata.filter((city)=>{
            return city.city === currentcity
        })
    }
}