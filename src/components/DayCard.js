import React from "react";
import "./Daycard.css";

const DayCard = ({ day, highTemp, lowTemp, weatherType, weatherIcon }) => {
  return (
    <div className="day-card">
      <h2>{day}</h2>
      <p>High: {highTemp}°C</p>
      <p>Low: {lowTemp}°C</p>
      <p>Weather: {weatherType}</p>
      {weatherIcon && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
          alt="Weather Icon"
        />
      )}
    </div>
  );
};

export default DayCard;
