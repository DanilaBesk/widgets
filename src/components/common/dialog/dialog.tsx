import { X } from "lucide-react";
import styles from "./dialog.module.css";

interface DialogProps {
  onDialogClose?: () => void;
  open: boolean;
  children?: React.ReactNode;
}
export const Dialog = ({ onDialogClose, open, children }: DialogProps) => {
  if (!open) {
    return null;
  }

  const onDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.dialogOutBackgroud} onClick={onDialogClose}>
      <section onClick={onDialogClick} className={styles.dialog}>
        <X
          onClick={onDialogClose}
          className={styles.buttonClose}
          width={36}
          height={36}
          color="red"
        />
        {children}
      </section>
    </div>
  );
};
