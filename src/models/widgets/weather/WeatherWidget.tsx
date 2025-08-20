import styles from './styles.module.css';
import { WeatherSkeleton } from '../../../components/common/skeleton/WeatherSkeleton';
import { useWeather } from '../../../hooks/useWeather';
import { toast } from 'sonner';
import type { TWeatherWidget } from './types';

interface WeatherWidgetProps {
  config: TWeatherWidget['config'];
}
const WeatherWidget = ({ config }: WeatherWidgetProps) => {
  const { data, error, isLoading } = useWeather(config);

  if (isLoading) {
    return <WeatherSkeleton />;
  }
  if (error) {
    toast.message(error.message);
  }

  return (
    <div className={styles.widget}>
      <div>
        {data?.current &&
          Object.keys(data.current).map((option) => {
            const value = data?.current?.[option as keyof typeof data.current];
            const unit = data?.current_units?.[option as keyof typeof data.current];
            if (option === 'interval') return null;
            if (option === 'time') {
              return <div>{new Date(value as string).toLocaleTimeString()}</div>;
            }
            return (
              <div>
                {value}
                {unit}
              </div>
            );
          })}
      </div>
      <div>
        {data?.hourly &&
          Object.keys(data.hourly).map((option) => {
            const value = data?.hourly?.[option as keyof typeof data.hourly];
            const unit = data?.hourly_units?.[option as keyof typeof data.hourly_units];
            if (option === 'interval') return null;
            if (option === 'time') {
              return <div>{new Date(value as string).toLocaleTimeString()}</div>;
            }
            return (
              <div>
                {value}
                {unit}
              </div>
            );
          })}
      </div>
      <div>
        {data?.daily &&
          Object.keys(data.daily).map((option) => {
            const value = data?.daily?.[option as keyof typeof data.daily];
            const unit = data?.daily_units?.[option as keyof typeof data.daily_units];
            if (option === 'interval') return null;
            if (option === 'time') {
              return <div>{new Date(value as string).toLocaleTimeString()}</div>;
            }
            return (
              <div>
                {value}
                {unit}
              </div>
            );
          })}
      </div>

      {/* <div className={styles.temperatureBlock}>
        <h1>{temp}</h1>
      </div>
      <div className={styles.weatherIcon}>
        <span>{icon}</span>
      </div>
      <div className={styles.weatherDescription}>
        <Title level={4}>{desc}</Title>
      </div> */}
    </div>
  );
};

export default WeatherWidget;
