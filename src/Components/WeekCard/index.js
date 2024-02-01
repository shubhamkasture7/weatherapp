import React, { useEffect, useState } from "react";
import {UseWeatherAPPContext} from '../../Context/Contex'

import SingleCardComponents from "../SingleCard";


const WeekInfoCardCoponents = () =>{

    const {state: {daily} , dispatch} = UseWeatherAPPContext();

    const [selectedCard , setSelectedCard] = useState(0);
    // console.log("daily" , daily);

    const updateCurrent = () =>{
        return(
            dispatch({
                type:'SET_CURRENT',
                payload: daily[selectedCard]
            })
        )
    }

    useEffect(() =>{
        updateCurrent();
    },[daily , selectedCard])

    return (
        <>
            <div className="cardWrap">
                <ul className="cardList">
                    {
                        daily && daily.length > 0 ? daily.map((item,index) =>{
                            if(index < 7)
                            {
                                return <SingleCardComponents key={index} item={item} 
                                className= {index === selectedCard ? 'active' : ''} onClick={() =>{
                                    setSelectedCard(index);
                                    updateCurrent();
                                }}/>

                            }
                        }): ''
                    }
                </ul>
            </div>
        </>
    )
}

export default WeekInfoCardCoponents;