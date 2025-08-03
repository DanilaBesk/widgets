import NoteCardMini from "./NoteCardMini";
import { useNotes } from "./useNotes";

export const NoteList = () => {
  const { notes } = useNotes();

  return (
    <div className="notes-container">
      {Object.values(notes).map((note) =>
        note ? <NoteCardMini note={note} key={note.id} /> : null
      )}
    </div>
  );
};
