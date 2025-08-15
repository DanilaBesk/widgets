import React from 'react';
import styles from './checkbox.module.css';
import cn from 'classnames';

interface CheckBoxProps extends React.ComponentProps<'input'> {}

export default function CheckBox({ className, ...props }: CheckBoxProps) {
  return <input type="checkbox" className={cn(styles.checkbox, className)} {...props} />;
}
