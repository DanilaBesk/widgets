import React from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface RadioProps extends React.ComponentProps<'input'> {}

export default function Radio({ className, ...props }: RadioProps) {
  return <input type="radio" className={cn(styles.radio, className)} {...props} />;
}
