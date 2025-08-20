import React from 'react';
import styles from './input.module.css';
import cn from 'classnames';

interface InputProps extends React.ComponentProps<'input'> {
  compSize?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
}

export default function Input({
  compSize = 'md',
  isInvalid = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        styles.input,
        styles[compSize],
        { [styles.invalid]: isInvalid },
        className,
      )}
      {...props}
    />
  );
}
