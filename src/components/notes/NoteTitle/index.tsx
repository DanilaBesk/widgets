import styles from './index.module.css';
import cn from 'classnames';
import { useData } from '../../../hooks/useData';
import { useNote } from '../../../hooks/useNote';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const NoteTitle = () => {
  const updateNote = useData((ctx) => ctx.updateNote);
  const { note } = useNote();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const hasError = useRef(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = e.target.value;
    if (updated.length > 200 && updated.length > note.title.length) {
      if (!hasError.current) {
        hasError.current = true;
        toast.error('Максимальный размер заголовка', {
          onAutoClose: () => {
            hasError.current = false;
          },
        });
      }
    } else {
      updateNote(note.id, { title: e.target.value });
    }
  };

  useEffect(() => {
    const el = titleRef.current;
    if (el) {
      el.style.height = 'auto'; // сброс высоты
      el.style.height = el.scrollHeight + 'px'; // подгон под содержимое
    }
  }, [note.title]);

  return (
    <div className={cn(styles.container)}>
      <textarea
        ref={titleRef}
        value={note.title}
        onChange={onChange}
        className={styles.title}
        rows={1}
        spellCheck={false}
      />
    </div>
  );
};
