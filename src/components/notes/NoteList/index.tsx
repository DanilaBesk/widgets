import { useData } from '../../../hooks/useData';
import NoteCardMini from '../NoteCardMini';
import styles from './index.module.css';

export const NoteList = () => {
  const notes = useData((ctx) => ctx.notes);
  return (
    <div className={styles.container}>
      {Object.values(notes)
        .filter((note) => !!note)
        .sort((a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0))
        .map((note) => (
          <NoteCardMini note={note} key={note.id} />
        ))}
    </div>
  );
};
