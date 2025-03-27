import React from "react";
import ChooseStateComponent from './ChooseState';
import WeekInfoCardCoponents from "./WeekCard";
import HUMIDITYComponents from "./Humidity"
import LeftComponents from "./Left"
import WeatherDisplay from "./WeatherDisplay";


const HomeComponents = () =>{
    return (
        <>
            <div className="homeWrap">
                <div className="weatherSection">
                    <LeftComponents/>
                    <div className="rightSide">
                        <ChooseStateComponent />
                        {/* <WeatherDisplay/> */}
                        <WeekInfoCardCoponents />
                        <HUMIDITYComponents/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeComponents;