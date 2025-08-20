import type { Options } from '../../../api/weather/types';
import type { TWidgetCommon } from '../../../store/data/types';

export type TWeatherWidget = TWidgetCommon<Options, 'weather'>;

export interface WeatherCodeInfo {
  text: string;
  emoji: string;
}
