import React, { useEffect, useState } from "react";
import { UseWeatherAPPContext } from "../../Context/Contex";
import SingleCardComponent from "../SingleCard";
import dayjs from "dayjs";

const WeekInfoCardComponents = () => {
    const { state: { daily }, dispatch } = UseWeatherAPPContext();
    const [selectedCard, setSelectedCard] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    // Filter to get only one unique entry per day
    useEffect(() => {
        if (daily && daily.length > 0) {
            const uniqueDays = {};
            const newFilteredData = daily.filter((item) => {
                const date = dayjs.unix(item.dt).format("YYYY-MM-DD");
                if (!uniqueDays[date]) {
                    uniqueDays[date] = true;
                    return true;
                }
                return false;
            });

            setFilteredData(newFilteredData);
        }
    }, [daily]);

    // Set current weather data when a card is selected
    useEffect(() => {
        if (filteredData.length > 0 && filteredData[selectedCard]) {
            dispatch({ type: "SET_CURRENT", payload: filteredData[selectedCard] });
        }
    }, [filteredData, selectedCard, dispatch]);

    return (
        <div className="cardWrap">
            <ul className="cardList">
                {filteredData.length > 0 ? (
                    filteredData.slice(0, 7).map((item, index) => (
                        <SingleCardComponent
                            key={item.dt}
                            item={item}
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
