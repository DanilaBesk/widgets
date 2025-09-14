import { forwardRef, useEffect, useRef } from 'react';
import styles from './index.module.css';
import cn from 'classnames';

interface NoteTextBlockProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSelect: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}

export const NoteTextBlock = forwardRef<HTMLTextAreaElement, NoteTextBlockProps>(
  ({ id, value, onChange, onKeyDown, onSelect }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    // Прокидываем ref наружу
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === 'function') ref(innerRef.current);
      else ref.current = innerRef.current;
    }, [ref]);
    // Авто-рост при изменении value
    useEffect(() => {
      const el = innerRef.current;
      if (el) {
        el.style.height = 'auto'; // сброс высоты
        el.style.height = el.scrollHeight + 'px'; // подгон под содержимое
      }
    }, [value]);

    return (
      <div className={cn(styles.block, value.length ? styles.content : styles.empty)}>
        <textarea
          id={id}
          ref={innerRef}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onSelect={onSelect}
          className={styles.textarea}
          rows={1}
          spellCheck={false}
        />
      </div>
    );
  },
);

NoteTextBlock.displayName = 'NoteTextBlock';
