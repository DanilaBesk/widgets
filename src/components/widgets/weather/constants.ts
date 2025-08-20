import type {
  CurrentWeatherInfo,
  DailyWeatherInfo,
  HourlyWeatherInfo,
} from '../../../api/weather/types';

export const ALL_OPTIONS = {
  current: [
    'weather_code',
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'cloud_cover',
    'wind_speed_10m',
  ],
  hourly: [
    'weather_code',
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'wind_speed_10m',
  ],
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'daylight_duration',
    'precipitation_sum',
    'precipitation_hours',
    'precipitation_probability_max',
    'wind_speed_10m_max',
  ],
} satisfies {
  current: CurrentWeatherInfo[];
  hourly: HourlyWeatherInfo[];
  daily: DailyWeatherInfo[];
};
