import Title from '../../../components/common/title/title';
import { useState } from 'react';
import Button from '../../../components/common/button/button';
import type { TWeatherWidget } from '../weather/types';
import CheckBox from '../../../components/common/checkbox/checkbox';
import { Dialog } from '../../../components/common/dialog/dialog';
import { ALL_OPTIONS } from './constants';
import styles from './styles.module.css';
import { useData } from '../../../hooks/useData';

interface WeatherCreateDialogProps {
  open: boolean;
  onClose: () => void;
  noteId: number;
  position: number;
}

const DialogCreateWeatherWidget = ({
  open,
  onClose,
  noteId,
  position,
}: WeatherCreateDialogProps) => {
  const [settings, setSettings] = useState<Required<TWeatherWidget['config']>>({
    current: {},
    hourly: {},
    daily: {},
  });

  const addWidget = useData((ctx) => ctx.addWidget);

  const createWeatherWidgetClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addWidget('weather', settings, noteId, position);
    setSettings({
      current: {},
      hourly: {},
      daily: {},
    });
    onClose();
  };

  return (
    <Dialog open={open} onDialogClose={onClose}>
      <Title level={1}>Создание виджета погоды</Title>
      <div>
        <form className="form-container" onSubmit={createWeatherWidgetClickHandler}>
          <Title level={3}>Выберите отображаемые параметры:</Title>
          <div>
            {ALL_OPTIONS.current.map((option) => (
              <div className={styles.weatherOptionsBlock}>
                {option}:
                <CheckBox
                  onChange={() =>
                    setSettings((prev) => ({
                      ...prev,
                      current: { ...prev.current, [option]: !prev.current[option] },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div>
            {ALL_OPTIONS.hourly.map((option) => (
              <div className={styles.weatherOptionsBlock}>
                {option}:
                <CheckBox
                  onChange={() =>
                    setSettings((prev) => ({
                      ...prev,
                      hourly: { ...prev.hourly, [option]: !prev.hourly[option] },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div>
            {ALL_OPTIONS.daily.map((option) => (
              <div className={styles.weatherOptionsBlock}>
                {option}:
                <CheckBox
                  onChange={() =>
                    setSettings((prev) => ({
                      ...prev,
                      daily: { ...prev.daily, [option]: !prev.daily[option] },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="btn-row">
            <Button type="submit" variant="accent" compSize="lg">
              Создать виджет
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
export default DialogCreateWeatherWidget;
