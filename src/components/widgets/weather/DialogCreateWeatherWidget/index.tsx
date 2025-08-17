import Title from '../../../common/Title';
import { useState } from 'react';
import Button from '../../../common/Button';
import type { TWeatherWidget } from '../types';
import CheckBox from '../../../common/CheckBox';
import { Dialog } from '../../../common/Dialog';
import { ALL_OPTIONS } from '../constants';
import styles from './index.module.css';
import { useData } from '../../../../hooks/useData';
import { Flex } from '../../../common/Flex';
import type { ModalElementProps } from '../../../../store/modal/types';

interface WeatherCreateDialogProps extends ModalElementProps {
  noteId: number;
  position: number;
}

const DialogCreateWeatherWidget = ({ close, noteId, position }: WeatherCreateDialogProps) => {
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
    close();
  };

  return (
    <Dialog onDialogClose={close}>
      <Title level={1}>Создание виджета погоды</Title>
      <div>
        <Flex
          as="form"
          direction="column"
          justify="start"
          gap="0.625rem"
          onSubmit={createWeatherWidgetClickHandler}
        >
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
          <Flex justify="end">
            <Button type="submit" variant="accent">
              Создать
            </Button>
          </Flex>
        </Flex>
      </div>
    </Dialog>
  );
};
export default DialogCreateWeatherWidget;
