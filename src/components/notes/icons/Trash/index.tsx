import cn from 'classnames';
import { Trash2 } from 'lucide-react';
import styles from './index.module.css';

interface TrashProps extends React.ComponentProps<typeof Trash2> {}

export const Trash = ({ className, ...props }: TrashProps) => {
  return <Trash2 className={cn([styles.trash, className])} {...props} />;
};
