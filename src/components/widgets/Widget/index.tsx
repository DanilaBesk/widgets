import { toast } from 'sonner';
import { WeatherWidget } from '../weather/WeatherWidget';
import { useData } from '../../../hooks/useData.ts';
import styles from './index.module.css';

export interface WidgetProps {
  widgetId: number;
}

const Widget = ({ widgetId }: WidgetProps) => {
  const widgets = useData((ctx) => ctx.widgets);

  const widget = widgets[widgetId];
  if (!widget) {
    toast.error('Виджет не найден.');
    return null;
  }
  let render;
  switch (widget.type) {
    case 'weather':
      render = <WeatherWidget options={widget.config} />;
  }
  return <section className={styles.widget}>{render}</section>;
};

export default Widget;
