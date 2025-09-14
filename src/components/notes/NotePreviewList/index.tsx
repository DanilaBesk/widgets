import { useData } from '../../../hooks/useData';
import { NotePreview } from '../NotePreview';
import styles from './index.module.css';

export const NotePreviewList = () => {
  const notes = useData((ctx) => ctx.notes);
  return (
    <div className={styles.container}>
      {Object.values(notes)
        .filter((note) => !!note)
        .sort((a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0))
        .map((note) => (
          <NotePreview note={note} key={note.id} />
        ))}
    </div>
  );
};
