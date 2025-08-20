import React, { useState } from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  compSize?: 'sm' | 'md' | 'lg';
  step?: number;
  discrete?: boolean;
}

export default function Slider({
  compSize = 'md',
  step = 1,
  discrete,
  min = 0,
  max = 100,
  value,
  onChange,
  className,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(Number(value) || Number(min));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const roundValue = Math.round(value);

    setInternalValue(value);

    if (onChange) {
      const event = {
        ...e,
        target: { ...e.target, value: roundValue.toString() },
      };
      onChange(event);
    }
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={discrete ? step : 0.001}
      value={internalValue}
      onChange={handleChange}
      className={cn(styles.slider, styles[compSize], className)}
      {...props}
    />
  );
}
