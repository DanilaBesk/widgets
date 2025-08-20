import React from 'react';
import type { FetchResponse, Options } from '../../../../api/weather/types';
import styles from './index.module.css';
import {
  Cloud,
  CloudRain,
  Thermometer,
  Clock,
  Sunrise,
  Sunset,
  Calendar,
  Wind,
  LucideTimer,
} from 'lucide-react';
import { useWeather } from '../../../../hooks/useWeather';
import { WeatherCodeMessage } from '../WeatherCodeMessages';
import Title from '../../../common/Title';
import { AppearanceTemperature } from '../icons/AppearanceTemperature';
import { RelativeHumidity } from '../icons/RelativeHumidity';
import { unitLabels } from '../../../../i18n/units';
import { Flex } from '../../../common/Flex';

const ICON_SIZE = 18;

const PRIORITY_ORDER: WeatherOption[] = [
  'weather_code',
  'temperature_2m',
  'apparent_temperature',
  'precipitation_probability',
  'precipitation',
  'cloud_cover',
  'relative_humidity_2m',
  'wind_speed_10m',
  'sunrise',
  'sunset',
  'daylight_duration',
];

function sortGroups(entries: [string, { values: { key: string; value: any; unit?: string }[] }][]) {
  return entries.sort(([a], [b]) => {
    const ai = PRIORITY_ORDER.indexOf(a as WeatherOption);
    const bi = PRIORITY_ORDER.indexOf(b as WeatherOption);

    // если есть в списке — сортируем по индексу
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1; // приоритетные вперед
    if (bi !== -1) return 1;
    return a.localeCompare(b); // остальные — по алфавиту
  });
}

type WeatherOption =
  | keyof Required<FetchResponse>['current']
  | keyof Required<FetchResponse>['hourly']
  | keyof Required<FetchResponse>['daily'];

function groupOptions(entries: [string, any][], units: Record<string, string>) {
  const groups: Record<string, { values: { key: string; value: any; unit?: string }[] }> = {};

  for (const [key, value] of entries) {
    let unknown = false;
    if (value === undefined || value === null) {
      // continue;
      unknown = true;
    }

    // убираем постфиксы
    let baseKey = key.replace(/_(max|min|sum|hours)$/, '');

    if (['sunrise', 'sunset'].includes(key)) {
      baseKey = 'sun_rise_set';
    }

    if (!groups[baseKey]) groups[baseKey] = { values: [] };
    if (unknown) groups[baseKey].values.push({ key, value: 'Неизвестно', unit: '' });
    else groups[baseKey].values.push({ key, value, unit: units[key] });
  }
  return groups;
}

type PropsCurrent = {
  data: FetchResponse;
};

const CurrentWeather: React.FC<PropsCurrent> = ({ data }) => {
  if (!data.current) return null;

  // (isDay === 1 ? <Sun size={ICON_SIZE} /> : <Moon size={ICON_SIZE} />)}
  const entries = Object.entries(data.current);
  const groups = groupOptions(entries, data.current_units ?? {});

  return (
    <div className={styles.row}>
      <Flex gap="0.75rem">
        {sortGroups(Object.entries(groups)).map(([baseKey, { values }]) => (
          <WeatherItem key={baseKey} option={baseKey as WeatherOption} values={values} />
        ))}
      </Flex>
    </div>
  );
};

function getDayLabel(date: string | Date, ignoreToday?: boolean): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  const yesterday = new Date();
  const tomorrow = new Date();

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today) && !ignoreToday) return 'Сегодня';
  if (isSameDay(date, yesterday)) return 'Вчера';
  if (isSameDay(date, tomorrow)) return 'Завтра';

  return '';
}

type PropsHourly = {
  data: FetchResponse;
};

const HourlyWeather: React.FC<PropsHourly> = ({ data }) => {
  if (!data.hourly) return null;

  return (
    <div className={styles.row}>
      {data.hourly.time?.map((time, idx) => {
        const entries = Object.entries(data.hourly!).map(([key, arr]) => [
          key,
          (arr as any)?.[idx],
        ]);
        const groups = groupOptions(entries as any, data.hourly_units ?? {});

        return (
          <div key={time} className={styles.card}>
            <div className={styles.time}>
              <Clock size={14} /> {new Date(time).getHours()}:00{' '}
              <span className={styles.dayLabel}>{getDayLabel(time, true)}</span>
            </div>
            <Flex direction="column" gap="0.375rem">
              {sortGroups(Object.entries(groups)).map(([baseKey, { values }]) => (
                <WeatherItem key={baseKey} option={baseKey as WeatherOption} values={values} />
              ))}
            </Flex>
          </div>
        );
      })}
    </div>
  );
};

type PropsDaily = {
  data: FetchResponse;
};

const DailyWeather: React.FC<PropsDaily> = ({ data }) => {
  if (!data.daily) return null;

  return (
    <div className={styles.row}>
      {data.daily.time?.map((time, idx) => {
        const entries = Object.entries(data.daily!).map(([key, arr]) => [key, (arr as any)?.[idx]]);
        const groups = groupOptions(entries as any, data.daily_units ?? {});

        return (
          <div key={time} className={styles.card}>
            <div className={styles.time}>
              <Calendar size={14} /> {time}
            </div>
            <Flex direction="column" gap="0.375rem">
              {sortGroups(Object.entries(groups)).map(([baseKey, { values }]) => (
                <WeatherItem key={baseKey} option={baseKey as WeatherOption} values={values} />
              ))}
            </Flex>
          </div>
        );
      })}
    </div>
  );
};

const WeatherItem = ({
  option,
  values,
}: {
  option: WeatherOption | 'sun_rise_set';
  values: { key: string; value: string | number; unit?: string }[];
}) => {
  const renderValues = () =>
    values.map(({ key, value, unit }) => {
      const label = key.endsWith('_max')
        ? 'макс'
        : key.endsWith('_min')
          ? 'мин'
          : key.endsWith('_sum')
            ? 'сум'
            : '';
      return (
        <span key={key}>
          {value}
          {unit ? unitLabels[unit] : ''}
          {label && <small> {label}</small>}
        </span>
      );
    });

  const renderContent = () => {
    switch (option) {
      case 'weather_code':
        return <>{WeatherCodeMessage[values[0].value as any] ?? 'Неизвестно'}</>;

      case 'temperature_2m':
        return (
          <>
            <Thermometer size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      case 'apparent_temperature':
        return (
          <>
            <AppearanceTemperature size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      case 'precipitation_probability':
      case 'precipitation':
        return (
          <>
            <CloudRain size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      case 'sun_rise_set':
        const sortedValues = [...values].sort((a, b) => {
          if (a.key === 'sunrise') return -1;
          if (b.key === 'sunrise') return 1;
          return 0;
        });
        return (
          <Flex items="center" gap="0.5rem">
            {sortedValues.map(({ key, value }) => (
              <Flex items="center" gap="0.25rem" key={key}>
                {key === 'sunrise' ? <Sunrise size={ICON_SIZE} /> : <Sunset size={ICON_SIZE} />}
                <span>
                  {new Date(value).getHours()}:{new Date(value).getMinutes()}
                </span>
              </Flex>
            ))}
          </Flex>
        );

      case 'cloud_cover':
        return (
          <>
            <Cloud size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      case 'relative_humidity_2m':
        return (
          <>
            <RelativeHumidity size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      case 'daylight_duration':
        const duration = new Date(Number(values[0].value) * 1000);
        return (
          <>
            <LucideTimer size={ICON_SIZE} />
            <span>
              {duration.getHours()}ч {duration.getMinutes()}м
            </span>
          </>
        );

      case 'wind_speed_10m':
        return (
          <>
            <Wind size={ICON_SIZE} />
            <div className={styles.valuesRow}>{renderValues()}</div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Flex items="center" gap="0.25rem" className={styles.item}>
      {renderContent()}
    </Flex>
  );
};

type Props = {
  options: Options;
};

export const WeatherWidget: React.FC<Props> = ({ options }) => {
  const { data, error, isLoading } = useWeather(options);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>Ошибка: {error.message || 'Не удалось загрузить данные'}</div>
    );
  }

  if (!data) {
    return <div className={styles.empty}>Нет данных для отображения</div>;
  }

  const isDay = data.current?.is_day;

  return (
    <div className={styles.widget}>
      {options.current && (
        <div className={styles.section}>
          <Title level={4}>Сейчас {isDay !== undefined ? (isDay ? '(день)' : '(ночь)') : ''}</Title>
          <CurrentWeather data={data} />
        </div>
      )}

      {options.hourly && (
        <div className={styles.section}>
          <Title level={4}>По часам</Title>
          <HourlyWeather data={data} />
        </div>
      )}

      {options.daily && (
        <div className={styles.section}>
          <Title level={4}>По дням</Title>
          <DailyWeather data={data} />
        </div>
      )}
    </div>
  );
};
