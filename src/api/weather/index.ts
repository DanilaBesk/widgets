import axios from 'axios';
import type { FetchResponse, Options, WeatherKeys } from './types';

const baseURL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(params: {
  latitude: number;
  longitude: number;
  options: Options;
}): Promise<FetchResponse> {
  const { latitude, longitude, options } = params;
  const settings = {
    ...{ ...options, current: undefined, hourly: undefined, daily: undefined },
  } as {
    [K in keyof Options]?: K extends WeatherKeys ? string : Options[K];
  };

  for (const section of ['current', 'hourly', 'daily'] as const) {
    const keys = Object.entries(options[section] ?? {})
      .filter(([, v]) => v === true)
      .map(([k]) => k)
      .join(',');
    if (keys) settings[section] = keys;
  }

  const resp = await axios.get<FetchResponse>(baseURL, {
    params: {
      latitude,
      longitude,
      timezone: 'auto',
      wind_speed_unit: 'ms',
      ...settings,
    },
  });
  return resp.data;
}
