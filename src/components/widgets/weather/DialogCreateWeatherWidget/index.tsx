import Title from '../../../common/Title';
import { useState } from 'react';
import Button from '../../../common/Button';
import CheckBox from '../../../common/CheckBox';
import { Dialog } from '../../../common/Dialog';
import Slider from '../../../common/Slider';
import { ALL_OPTIONS } from '../constants';
import { useData } from '../../../../hooks/useData';
import { Flex } from '../../../common/Flex';
import type { TWeatherWidget } from '../types';
import type { ModalElementProps } from '../../../../store/modal/types';
import styles from './index.module.css';
import type {
  CurrentWeatherInfo,
  DailyWeatherInfo,
  HourlyTemporalResolution,
  HourlyWeatherInfo,
  Options,
  WeatherKeys,
} from '../../../../api/weather/types';
import Label from '../../../common/Label';
import Select from '../../../common/Select';
import { toast } from 'sonner';
import cn from 'classnames';

const OPTIONS_TRANSLATIONS: Record<
  CurrentWeatherInfo | HourlyWeatherInfo | DailyWeatherInfo,
  string
> = {
  weather_code: 'Состояние погоды',
  temperature_2m: 'Температура',
  relative_humidity_2m: 'Влажность',
  apparent_temperature: 'Ощущается как',
  is_day: 'День/ночь',
  precipitation: 'Осадки',
  cloud_cover: 'Облачность',
  wind_speed_10m: 'Скорость ветра',
  precipitation_probability: 'Вероятность осадков',
  temperature_2m_max: 'Макс. температура',
  temperature_2m_min: 'Мин. температура',
  apparent_temperature_max: 'Макс. ощущается как',
  apparent_temperature_min: 'Мин. ощущается как',
  sunrise: 'Восход солнца',
  sunset: 'Закат солнца',
  daylight_duration: 'Продолжительность дня',
  precipitation_sum: 'Сумма осадков',
  precipitation_hours: 'Часы осадков',
  precipitation_probability_max: 'Макс. вероятность осадков',
  wind_speed_10m_max: 'Макс. скорость ветра',
};

const defaultSettings = {
  current: {} as Record<CurrentWeatherInfo, boolean>,
  hourly: {} as Record<HourlyWeatherInfo, boolean>,
  daily: {} as Record<DailyWeatherInfo, boolean>,
  forecast_days: 7,
  forecast_hours: 10,
  past_days: 0,
  past_hours: 0,
  temporal_resolution: 'hourly_1',
} as const;

interface WeatherCreateDialogProps extends ModalElementProps {
  noteId: number;
  blockIndex: number;
  cursorPosition: number;
}

const filterOptions = (setting: Required<Options>[WeatherKeys]) => {
  return Object.entries(setting).filter(([_, value]) => value === true);
};

const DialogCreateWeatherWidget = ({
  close,
  noteId,
  blockIndex,
  cursorPosition,
}: WeatherCreateDialogProps) => {
  const [settings, setSettings] = useState<Required<Pick<Options, WeatherKeys>>>(defaultSettings);

  const [hourRange, setHourRange] = useState(10);
  const [hourPastRange, setHourPastRange] = useState(0);
  const [temporalResolution, setTemporalResolution] =
    useState<HourlyTemporalResolution>('hourly_1');
  const [dayRange, setDayRange] = useState(7);
  const [dayPastRange, setDayPastRange] = useState(0);

  const addWidget = useData((ctx) => ctx.addWidget);

  const selectedCount = {
    current: filterOptions(settings.current).length,
    hourly: filterOptions(settings.hourly).length,
    daily: filterOptions(settings.daily).length,
  };

  const handleCreateWidget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCount.current && !selectedCount.hourly && !selectedCount.daily) {
      return toast.error('Выберите хотя бы 1 опцию');
    }

    const filteredSettings = Object.entries(settings).reduce<TWeatherWidget['config']>(
      (acc, [option, value]) => {
        const filteredOptions = filterOptions(value);
        if (filteredOptions.length) {
          acc[option as WeatherKeys] = Object.fromEntries(filteredOptions);
        }
        return acc;
      },
      {},
    );

    filteredSettings.forecast_hours = hourRange;
    filteredSettings.past_hours = hourPastRange;
    filteredSettings.temporal_resolution = temporalResolution;

    filteredSettings.forecast_days = dayRange;
    filteredSettings.past_days = dayPastRange;

    addWidget('weather', filteredSettings, noteId, blockIndex, cursorPosition);

    setSettings(defaultSettings);
    close();
  };

  const renderOptionBlock = <K extends keyof typeof ALL_OPTIONS>(
    options: (typeof ALL_OPTIONS)[K],
    type: K,
  ) => {
    return (
      <Flex direction="column" flex="1" gap="0.4rem" items="start">
        {options.map((option) => (
          <Label key={option}>
            <CheckBox
              checked={!!(settings[type] as any)[option]}
              onChange={() =>
                setSettings((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    [option]: !(prev[type] as any)?.[option],
                  },
                }))
              }
            />
            {OPTIONS_TRANSLATIONS[option] || option}
          </Label>
        ))}
      </Flex>
    );
  };

  return (
    <Dialog onDialogClose={close}>
      <Title level={1}>Создание виджета погоды</Title>
      <Flex as="form" direction="column" gap="0.625rem" onSubmit={handleCreateWidget}>
        <Title level={3}>Выберите отображаемые параметры:</Title>

        <Flex gap="0.625rem" wrap>
          <Flex
            as="section"
            className={cn(styles.optionsSection, selectedCount.current && styles.active)}
          >
            <Title level={4}>Текущая погода</Title>

            {renderOptionBlock(ALL_OPTIONS.current, 'current')}
          </Flex>

          <Flex
            as="section"
            className={cn(styles.optionsSection, selectedCount.hourly && styles.active)}
          >
            <Title level={4}>Почасовая погода</Title>

            {renderOptionBlock(ALL_OPTIONS.hourly, 'hourly')}

            <Label direction="column">
              Прогнозируемые часы: {hourRange}
              <Slider
                className={styles.slider}
                min={1}
                max={24}
                value={hourRange}
                onChange={(e) => setHourRange(Number(e.target.value))}
              />
            </Label>
            <Label direction="column">
              Прошлые часы: {hourPastRange}
              <Slider
                className={styles.slider}
                min={0}
                max={24}
                value={hourPastRange}
                onChange={(e) => setHourPastRange(Number(e.target.value))}
              />
            </Label>
            <Label direction="row">
              Временной интервал:
              <Select
                compSize="md"
                value={temporalResolution}
                name="temporal-resolution"
                onChange={(e) => setTemporalResolution(e.target.value as HourlyTemporalResolution)}
                options={[
                  { value: 'hourly_1', label: '1 ч' },
                  { value: 'hourly_3', label: '3 ч' },
                  { value: 'hourly_6', label: '6 ч' },
                ]}
              />
            </Label>
          </Flex>

          <Flex
            as="section"
            className={cn(styles.optionsSection, selectedCount.daily && styles.active)}
          >
            <Title level={4}>Ежедневная погода</Title>

            {renderOptionBlock(ALL_OPTIONS.daily, 'daily')}

            <Label direction="column">
              Прогнозируемые дни: {dayRange}
              <Slider
                className={styles.slider}
                min={1}
                max={10}
                value={dayRange}
                onChange={(e) => setDayRange(Number(e.target.value))}
              />
            </Label>
            <Label direction="column">
              Прошлые дни: {dayPastRange}
              <Slider
                className={styles.slider}
                min={0}
                max={10}
                value={dayPastRange}
                onChange={(e) => setDayPastRange(Number(e.target.value))}
              />
            </Label>
          </Flex>
        </Flex>

        <Flex justify="end">
          <Button type="submit" variant="accent">
            Создать
          </Button>
        </Flex>
      </Flex>
    </Dialog>
  );
};

export default DialogCreateWeatherWidget;
