import React from "react";
import ChooseStateComponent from './ChooseState';
import WeekInfoCardCoponents from "./WeekCard";
import HUMIDITYComponents from "./Humidity"
import LeftComponents from "./Left"


const HomeComponents = () =>{
    return (
        <>
            <div className="homeWrap">
                <div className="weatherSection">
                    <LeftComponents/>
                    <div className="rightSide">
                        <ChooseStateComponent />
                        <WeekInfoCardCoponents/>
                        <HUMIDITYComponents/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeComponents;