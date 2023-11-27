import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HourlyForecast.css";

const HourlyForecast = () => {
  const { day } = useParams();
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        const API_KEY = "ed511057c0dae32dbd138b158f728c23";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Zocca&appid=${API_KEY}`
        );

        const filteredData = response.data.list.filter(
          (item) => item.dt_txt.split(" ")[0] === day
        );

        setHourlyForecast(filteredData);
      } catch (error) {
        console.error("Error fetching hourly data:", error);
      }
    };

    fetchHourlyData();
  }, [day]);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const getHourlyTempHighLow = () => {
    const hourlyTemps = {};
    hourlyForecast.forEach((hour) => {
      const date = hour.dt_txt.split(" ")[0];
      const time = hour.dt_txt.split(" ")[1];

      const key = `${date}_${time}`;

      if (!hourlyTemps[key]) {
        hourlyTemps[key] = { maxTemp: -Infinity, minTemp: Infinity };
      }
      const celsiusTemp = kelvinToCelsius(hour.main.temp);
      hourlyTemps[key].maxTemp = Math.max(
        hourlyTemps[key].maxTemp,
        celsiusTemp
      );
      hourlyTemps[key].minTemp = Math.min(
        hourlyTemps[key].minTemp,
        celsiusTemp
      );
    });
    return hourlyTemps;
  };

  const hourlyTemps = getHourlyTempHighLow();

  return (
    <div>
      <h1>Hourly Forecast for {day}</h1>
      <ul>
        {hourlyForecast.map((hour, index) => (
          <li key={index}>
            <p>{hour.dt_txt.split(" ")[1]}</p>
            <p>Temperature: {kelvinToCelsius(hour.main.temp).toFixed(2)}°C</p>
            <p>Weather: {hour.weather[0].description}</p>
            {hourlyTemps[day] && (
              <p>
                High: {hourlyTemps[day].maxTemp.toFixed(2)}°C / Low:{" "}
                {hourlyTemps[day].minTemp.toFixed(2)}°C
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
