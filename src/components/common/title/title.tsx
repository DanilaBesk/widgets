import cn from "classnames";
import styles from "./title.module.css";

import * as React from "react";

type TitleLevel = 1 | 2 | 3 | 4;

interface TitleProps {
  level?: TitleLevel;
  subtle?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Title({
  level,
  subtle = false,
  className,
  children,
  ...props
}: TitleProps & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      className: cn(
        styles.title,
        styles[`h${level}`],
        subtle && styles.subtle,
        className
      ),
      ...props,
    },
    children
  );
}
