import { useNote } from '../../../hooks/useNote';
import { formatDate } from '../lib/formatDate';
import styles from './index.module.css';

export const NoteCreatedAt = () => {
  const { note } = useNote();

  return (
    <div className={styles.container}>
      <span className={styles.text}>{formatDate(note.createdAt)}</span>
    </div>
  );
};
