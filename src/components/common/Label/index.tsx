import cn from 'classnames';
import styles from './index.module.css';

interface LabelProps extends React.ComponentProps<'label'> {
  direction?: 'row' | 'column';
  children: React.ReactNode;
  className?: string;
}

const Label = ({ direction, children, className }: LabelProps) => {
  return (
    <label className={cn(styles.label, direction === 'column' && styles.column, className)}>
      {children}
    </label>
  );
};

export default Label;
