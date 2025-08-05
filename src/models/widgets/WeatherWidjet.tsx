import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherCodeMessage {
  [code: number]: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState(0);
  const [temperature, setTemperature] = useState("0");
  const [latitude, setLatitude] = useState(55.75);
  const [longitude, setLongtitude] = useState(37.62);

  const weatherCodeMessage: WeatherCodeMessage = {
    0: "Ясно ☀️",
    1: "В основном ясно 🌤️",
    2: "Переменная облачность 🌥️",
    3: "Пасмурно ☁️",
    45: "Туман 🌫️",
    48: "Туман (изморозь) 🌫️",
    51: "Лёгкая морось 🌦️",
    53: "Умеренная морось 🌦️",
    55: "Сильная морось 🌦️",
    56: "Лёгкая ледяная морось 🌧️❄️",
    57: "Сильная ледяная морось 🌧️❄️",
    61: "Лёгкий дождь 🌧️",
    63: "Умеренный дождь 🌧️",
    65: "Сильный дождь 🌧️",
    66: "Лёгкий ледяной дождь 🌧️❄️",
    67: "Сильный ледяной дождь 🌧️❄️",
    71: "Лёгкий снег 🌨️",
    73: "Умеренный снег 🌨️",
    75: "Сильный снег 🌨️",
    77: "Снежные зёрна ❄️",
    80: "Лёгкий ливень 🌦️",
    81: "Умеренный ливень 🌦️",
    82: "Сильный ливень ⛈️",
    85: "Лёгкий снегопад 🌨️",
    86: "Сильный снегопад 🌨️",
    95: "Гроза 🌩️",
    96: "Гроза с лёгким градом ⛈️",
    99: "Гроза с сильным градом ⛈️❄️",
  };

  const currentWeatherMessage: string =
    weatherCodeMessage[weather] || "Неизветная погода";

  useEffect(() => {
    async function getWeather(latitude: number, longitude: number) {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
        );
        console.log(response.data.current.temperature_2m);
        setTemperature(`${response.data.current.temperature_2m}°C`);
        setWeather(response.data.current.weather_code);
      } catch (error) {
        setTemperature("-99");
        setWeather(900);
        console.log("ошибка");
      }
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(Math.round(position.coords.latitude * 100) / 100);
      setLongtitude(Math.round(position.coords.longitude * 100) / 100);
      console.log(`Получены координаты ${latitude} ${longitude}`);
    });

    getWeather(latitude, longitude);
  }, [weather, temperature, latitude, longitude]);
  return (
    <div>
      <h1>{currentWeatherMessage}</h1>
      <h1>{temperature}</h1>
    </div>
  );
};

export default WeatherWidget;
