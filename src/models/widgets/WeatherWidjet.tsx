import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import type { JSX } from "react";

import {
  Sun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  Snowflake,
  Zap,
  CircleQuestionMark,
} from "lucide-react";

interface WeatherInfo {
  text: string;
  icon: JSX.Element;
}
interface WeatherCodeMessage {
  [code: number]: WeatherInfo;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState(0);
  const [temperature, setTemperature] = useState("0");
  const [latitude, setLatitude] = useState(55.75);
  const [longitude, setLongtitude] = useState(37.62);
  const [isLoading, setIsLoading] = useState(false);

  const weatherCodeMessage: WeatherCodeMessage = {
    0: { text: "Ясно", icon: <Sun size={48} color="#f5c518" /> },
    1: { text: "В основном ясно", icon: <Sun size={48} color="#f5c518" /> },
    2: {
      text: "Переменная облачность",
      icon: <Cloud size={48} color="#c0c0c0" />,
    },
    3: { text: "Пасмурно", icon: <CloudFog size={48} color="#808080" /> },
    45: { text: "Туман", icon: <CloudFog size={48} color="#a0a0a0" /> },
    48: {
      text: "Туман (изморозь)",
      icon: <CloudFog size={48} color="#a0a0a0" />,
    },

    51: {
      text: "Лёгкая морось",
      icon: <CloudRain size={48} color="#5dade2" />,
    },
    53: {
      text: "Умеренная морось",
      icon: <CloudRain size={48} color="#3498db" />,
    },
    55: {
      text: "Сильная морось",
      icon: <CloudRain size={48} color="#2e86c1" />,
    },

    56: {
      text: "Лёгкая ледяная морось",
      icon: <CloudSnow size={48} color="#85c1e9" />,
    },
    57: {
      text: "Сильная ледяная морось",
      icon: <CloudSnow size={48} color="#5dade2" />,
    },

    61: { text: "Лёгкий дождь", icon: <CloudRain size={48} color="#5dade2" /> },
    63: {
      text: "Умеренный дождь",
      icon: <CloudRain size={48} color="#3498db" />,
    },
    65: {
      text: "Сильный дождь",
      icon: <CloudRain size={48} color="#21618c" />,
    },

    66: {
      text: "Лёгкий ледяной дождь",
      icon: <CloudSnow size={48} color="#85c1e9" />,
    },
    67: {
      text: "Сильный ледяной дождь",
      icon: <CloudSnow size={48} color="#5dade2" />,
    },

    71: { text: "Лёгкий снег", icon: <Snowflake size={48} color="#aed6f1" /> },
    73: {
      text: "Умеренный снег",
      icon: <Snowflake size={48} color="#85c1e9" />,
    },
    75: { text: "Сильный снег", icon: <Snowflake size={48} color="#5dade2" /> },
    77: {
      text: "Снежные зёрна",
      icon: <Snowflake size={48} color="#a9cce3" />,
    },

    80: {
      text: "Лёгкий ливень",
      icon: <CloudRain size={48} color="#3498db" />,
    },
    81: {
      text: "Умеренный ливень",
      icon: <CloudRain size={48} color="#2e86c1" />,
    },
    82: {
      text: "Сильный ливень",
      icon: <CloudRain size={48} color="#1b4f72" />,
    },

    85: {
      text: "Лёгкий снегопад",
      icon: <CloudSnow size={48} color="#aed6f1" />,
    },
    86: {
      text: "Сильный снегопад",
      icon: <CloudSnow size={48} color="#5dade2" />,
    },

    95: { text: "Гроза", icon: <Zap size={48} color="#bb8fce" /> },
    96: {
      text: "Гроза с лёгким градом",
      icon: <Zap size={48} color="#a569bd" />,
    },
    99: {
      text: "Гроза с сильным градом",
      icon: <Zap size={48} color="#8e44ad" />,
    },

    900: {
      text: "Ошибка получения погоды",
      icon: <CircleQuestionMark size={48} color="#e74c3c" />,
    },
  };

  const currentWeatherMessage: string =
    weatherCodeMessage[weather].text || "Неизветная погода";

  const currentWeatherIcon: JSX.Element = weatherCodeMessage[weather].icon;

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

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);
      try {
        await navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(Math.round(position.coords.latitude * 100) / 100);
          setLongtitude(Math.round(position.coords.longitude * 100) / 100);
          console.log(`Получены координаты ${latitude} ${longitude}`);
        });
        getWeather(latitude, longitude);
      } catch (error) {
        console.log(`Координаты не получены ${latitude} ${longitude}`);
        getWeather(latitude, longitude);
      }
      setIsLoading(false);
    };
    getLocation();
  }, []);

  return (
    <div>
      <div className={styles.widget}>
        <div className={styles.temperatureBlock}>
          <h1>{isLoading ? "..." : temperature}</h1>
        </div>
        <div className={styles.weatherIcon}>{currentWeatherIcon}</div>
        <div className={styles.weatherDescription}>
          <h1>{isLoading ? "Идёт загрузка" : currentWeatherMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
