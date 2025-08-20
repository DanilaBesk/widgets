import { useEffect, useState } from 'react';

interface Props {
  enableHighAccuracy?: boolean;
  timeoutMs?: number;
  maximumAgeMs?: number;
}

function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export function useGeolocation(options?: Props) {
  const { enableHighAccuracy = true, timeoutMs = 10000, maximumAgeMs = 60000 } = options ?? {};

  const [latitude, setLatitude] = useState<number | null>(36);
  const [longitude, setLongitude] = useState<number | null>(54);
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function getPositionPromise(): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !('geolocation' in navigator)) {
          reject(new Error('Геопозиция не поддерживается!'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy,
          timeout: timeoutMs,
          maximumAge: maximumAgeMs,
        });
      });
    }

    (async () => {
      setIsLocating(true);
      try {
        // await new Promise((res, rej) => setTimeout(res, 2000));
        const position = await getPositionPromise();
        if (!isMounted) return;
        setLatitude(roundToTwoDecimals(position.coords.latitude));
        setLongitude(roundToTwoDecimals(position.coords.longitude));
      } catch (err) {
        console.log('Ошибка получения геолокации:', err);
        if (!isMounted) return;
        setError(err as GeolocationPositionError);
      } finally {
        if (!isMounted) return;
        setIsLocating(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { latitude, longitude, isLocating, error };
}
