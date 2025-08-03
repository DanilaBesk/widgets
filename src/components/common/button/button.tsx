import React from "react";
import styles from "./button.module.css";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent" | "danger" | "ghost";
  compSize?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "default",
  compSize = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[compSize],
        className
      )}
      {...props}
    />
  );
}
