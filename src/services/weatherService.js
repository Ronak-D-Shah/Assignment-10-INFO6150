// WeatherService.js
import axios from "axios";

const API_KEY = "ed511057c0dae32dbd138b158f728c23"; // Your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const WeatherService = {
  getFiveDayForecastByCityName: async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching 5-day forecast:", error);
      throw error;
    }
  },
};

export default WeatherService;
