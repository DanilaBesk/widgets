import { toast } from 'sonner';
import WeatherWidget from '../weather/WeatherWidget';
import { useData } from '../../../hooks/useData.ts';

export interface WidgetProps {
  widgetId: number;
}

const Widget = ({ widgetId }: WidgetProps) => {
  const widgets = useData((ctx) => ctx.widgets);

  const widget = widgets[widgetId];
  if (!widget) {
    toast.error('Виджет не найден.');
    return <div color="red">Виджет не найден!</div>;
  }

  switch (widget.type) {
    case 'weather':
      return <WeatherWidget config={widget.config} />;
  }
};

export default Widget;
