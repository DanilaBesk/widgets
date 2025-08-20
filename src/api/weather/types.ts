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
  | 'wind_speed_10m_max';

type BooleanPartial<Keys extends string> = {
  [K in Keys]?: boolean;
};

export type WeatherKeys = 'current' | 'hourly' | 'daily';
export type HourlyTemporalResolution = 'hourly_1' | 'hourly_3' | 'hourly_6';

export type Options = {
  current?: BooleanPartial<CurrentWeatherInfo>;
  hourly?: BooleanPartial<HourlyWeatherInfo>;
  daily?: BooleanPartial<DailyWeatherInfo>;

  forecast_hours?: number;
  past_hours?: number;
  temporal_resolution?: HourlyTemporalResolution;
  forecast_days?: number;
  past_days?: number;
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
  current_units?: Partial<Record<CurrentWeatherInfo, string>> & { time: string; interval: string };
  current?: Partial<ResponseTypeMapper<CurrentWeatherInfo>> & { time: string; interval: number };

  hourly_units?: Partial<Record<HourlyWeatherInfo, string>> & { time: string };
  hourly?: Partial<ResponseTypeMapper<HourlyWeatherInfo>> & { time: string[] };

  daily_units?: Partial<Record<DailyWeatherInfo, string>> & { time: string };
  daily?: Partial<ResponseTypeMapper<DailyWeatherInfo>> & { time: string[] };
};
