import { useData } from '../../hooks/useData';
import NoteCardMini from './NoteCardMini';

export const NoteList = () => {
  const notes = useData((ctx) => ctx.notes);

  return (
    <div className="notes-container">
      {Object.values(notes)
        .filter((note) => !!note)
        .sort((a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0))
        .map((note) => (
          <NoteCardMini note={note} key={note.id} />
        ))}
    </div>
  );
};
