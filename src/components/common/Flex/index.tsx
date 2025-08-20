import React, { type ElementType } from 'react';
import cn from 'classnames';
import styles from './index.module.css';

interface FlexProps<T extends ElementType = 'div'> extends React.HTMLAttributes<HTMLElement> {
  as?: T;
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'center' | 'end' | 'stretch';
  self?: 'auto' | 'start' | 'center' | 'end' | 'stretch';
  gap?: number | string;
  flex?: string;
  wrap?: boolean;
}

export const Flex = <T extends ElementType = 'div'>({
  as,
  direction = 'row',
  justify = 'start',
  items = 'stretch',
  self,
  gap,
  flex,
  wrap = false,
  className,
  children,
  style,
  ...props
}: FlexProps<T>) => {
  const Component = as ?? ('div' as ElementType);

  return (
    <Component
      className={cn(
        styles.flex,
        styles[direction],
        styles[`justify-${justify}`],
        styles[`align-${items}`],
        self && styles[`self-${self}`],
        wrap && styles.wrap,
        className,
      )}
      style={{ ...style, gap, flex }}
      {...props}
    >
      {children}
    </Component>
  );
};
