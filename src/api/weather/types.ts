export type CurrentWeatherInfo =
  | 'weather_code'
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'apparent_temperature'
  | 'is_day'
  | 'precipitation'
  | 'cloud_cover'
  | 'wind_speed_10m';

export type HourlyWeatherInfo =
  | 'weather_code'
  | 'temperature_2m'
  | 'relative_humidity_2m'
  | 'apparent_temperature'
  | 'precipitation_probability'
  | 'precipitation'
  | 'wind_speed_10m';

export type DailyWeatherInfo =
  | 'weather_code'
  | 'temperature_2m_max'
  | 'temperature_2m_min'
  | 'apparent_temperature_max'
  | 'apparent_temperature_min'
  | 'sunrise'
  | 'sunset'
  | 'daylight_duration'
  | 'precipitation_sum'
  | 'precipitation_hours'
  | 'precipitation_probability_max'
  | 'precipitation'
  | 'wind_speed_10m_max';

type StrictPartial<Keys extends string> = {
  [K in Keys]?: boolean;
};

export type Options = {
  current?: StrictPartial<CurrentWeatherInfo>;
  hourly?: StrictPartial<HourlyWeatherInfo>;
  daily?: StrictPartial<DailyWeatherInfo>;
};

type ResponseTypeMapper<T extends string> = {
  [K in T]: K extends 'time' | 'sunrise' | 'sunset' ? string : number;
};

type BaseResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};

export type FetchResponse = BaseResponse & {
  current_units?: Partial<Record<CurrentWeatherInfo, string>> & { time: string };
  current?: Partial<ResponseTypeMapper<CurrentWeatherInfo>> & { time: string };

  hourly_units?: Partial<Record<HourlyWeatherInfo, string>> & { time: string };
  hourly?: Partial<ResponseTypeMapper<HourlyWeatherInfo>> & { time: string };

  daily_units?: Partial<ResponseTypeMapper<DailyWeatherInfo>> & { time: string };
  daily?: Partial<Record<DailyWeatherInfo, (number | string)[]>> & { time: string };
};
