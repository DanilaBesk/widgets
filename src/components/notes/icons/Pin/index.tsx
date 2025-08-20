import cn from 'classnames';
import { Pin as PinLucide } from 'lucide-react';
import styles from './index.module.css';

interface PinProps extends React.ComponentProps<typeof PinLucide> {
  isPinned?: boolean;
}

export const Pin = ({ isPinned, className, ...props }: PinProps) => {
  return <PinLucide {...props} className={cn([isPinned && styles.pinned, className])} />;
};
