import { useEffect, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { fetchWeather } from '../api/weather';
import type { FetchResponse as FetchWeatherResponse } from '../api/weather/types';
import type { TWeatherWidget } from '../components/widgets/weather/types';

export function useWeather(config: TWeatherWidget['config']) {
  const { isLocating, latitude, longitude } = useGeolocation();

  const [data, setData] = useState<FetchWeatherResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWeather() {
    try {
      setIsLoading(true);
      if (!latitude || !longitude) {
        return setError(new Error('Не смог определить геолокацию'));
      }
      const response = await fetchWeather({
        latitude,
        longitude,
        options: config,
      });

      setData(response);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Неизвестная ошибка получения погоды'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLocating) return;
    // TODO: прервать и начать заново в некоторых случаях
    getWeather();
  }, [isLocating, latitude, longitude]);

  return {
    isLoading: isLocating || isLoading,
    data,
    error,
  };
}
