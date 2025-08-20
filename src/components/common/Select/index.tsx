import React from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface SelectOption {
  label?: string;
  value: string;
}

interface SelectProps extends React.ComponentProps<'select'> {
  options: SelectOption[];
  compSize?: 'sm' | 'md' | 'lg';
}

export default function Select({ className, options, compSize = 'md', ...props }: SelectProps) {
  return (
    <div className={styles.selectWrapper}>
      <select className={cn(styles.select, styles[compSize], className)} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label || o.value}
          </option>
        ))}
      </select>
    </div>
  );
}
