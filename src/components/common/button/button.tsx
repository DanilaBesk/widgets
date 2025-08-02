import classes from "./styles.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <div onClick={onClick} className={classes["my-btn"]}>
      {children}
    </div>
  );
};

export default Button;
