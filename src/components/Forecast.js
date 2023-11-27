import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DayCard from "./DayCard";
import WeatherService from "../services/weatherService";
import "./Forecast.css";

const Forecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await WeatherService.getFiveDayForecastByCityName(
          "Boston"
        );
        setWeatherData(response.list);
        setCityName(response.city.name);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, []);

  const getDailyWeather = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fiveDaysWeather = {};
    weatherData.forEach((data) => {
      const date = new Date(data.dt * 1000);
      date.setHours(0, 0, 0, 0);

      if (date >= today) {
        const formattedDate = date.toISOString().split("T")[0];
        if (!fiveDaysWeather[formattedDate]) {
          fiveDaysWeather[formattedDate] = {
            date: formattedDate,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            weather: {
              main: data.weather[0].main,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            },
            otherFields: {},
          };
        } else {
          fiveDaysWeather[formattedDate].maxTemp = Math.max(
            fiveDaysWeather[formattedDate].maxTemp,
            data.main.temp_max
          );
          fiveDaysWeather[formattedDate].minTemp = Math.min(
            fiveDaysWeather[formattedDate].minTemp,
            data.main.temp_min
          );
        }
      }
    });

    return Object.values(fiveDaysWeather);
  };

  const dailyWeather = getDailyWeather();

  return (
    <div>
      <h1>5-Day Weather Forecast for {cityName}</h1>
      <div className="forecast-container">
        {dailyWeather.map((weather, index) => (
          <Link to={`/${weather.date}`} key={index}>
            <DayCard
              day={weather.date}
              highTemp={Math.round(weather.maxTemp)}
              lowTemp={Math.round(weather.minTemp)}
              weatherType={weather.weather.main}
              weatherIcon={weather.weather.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
