import React from "react";
import styles from "./textArea.module.css";
import cn from "classnames";

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  compSize?: "sm" | "md" | "lg";
  isInvalid?: boolean;
}

export default function TextArea({
  compSize = "md",
  isInvalid = false,
  className,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={cn(
        styles.textArea,
        styles[compSize],
        { [styles.invalid]: isInvalid },
        className
      )}
      {...props}
    />
  );
}
