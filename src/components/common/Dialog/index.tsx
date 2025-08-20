import { X } from 'lucide-react';
import styles from './index.module.css';
import { Flex } from '../Flex';

interface DialogProps {
  onDialogClose?: () => void;
  children?: React.ReactNode;
}

export const Dialog = ({ onDialogClose, children }: DialogProps) => {
  const onDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Flex
      justify="center"
      items="center"
      className={styles.dialogOutBackgroud}
      onClick={onDialogClose}
    >
      <section onClick={onDialogClick} className={styles.dialog}>
        <X
          onClick={onDialogClose}
          className={styles.buttonClose}
          width={32}
          height={32}
          color="red"
        />
        {children}
      </section>
    </Flex>
  );
};
