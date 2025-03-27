import React, { useEffect, useState } from "react";
import { UseWeatherAPPContext } from "../../Context/Contex";
import SingleCardComponents from "../SingleCard";

const WeekInfoCardComponents = () => {
    const { state: { daily }, dispatch } = UseWeatherAPPContext();
    const [selectedCard, setSelectedCard] = useState(0);

    // Ensure we only update state if daily data is available
    useEffect(() => {
        if (daily && daily.length > 0 && daily[selectedCard]) {
            dispatch({ type: "SET_CURRENT", payload: daily[selectedCard] });
        }
    }, [daily, selectedCard, dispatch]);

    return (
        <div className="cardWrap">
            <ul className="cardList">
                {daily && daily.length > 0 ? (
                    daily.slice(0, 7).map((item, index) => (
                        <SingleCardComponents
                            key={index}
                            item={item || {}} // Fallback to an empty object
                            className={index === selectedCard ? "active" : ""}
                            onClick={() => setSelectedCard(index)}
                        />
                    ))
                ) : (
                    <p>Loading weather data...</p>
                )}
            </ul>
        </div>
    );
};

export default WeekInfoCardComponents;
