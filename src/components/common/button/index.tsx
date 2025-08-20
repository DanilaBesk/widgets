import React from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'danger' | 'icon';
  compSize?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'default',
  compSize = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], styles[compSize], className)} {...props}>
      {children}
    </button>
  );
}
