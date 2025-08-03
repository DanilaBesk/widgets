import NoteCardMini from "./NoteCardMini";
import { useNotes } from "./useNotes";

export const NoteList = () => {
  const { notes } = useNotes();

  return (
    <div className="notes-container">
      {Object.values(notes)
        .filter((note) => !!note)
        .sort(
          (a, b) =>
            (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0)
        )
        .map((note) => (
          <NoteCardMini note={note} key={note.id} />
        ))}
    </div>
  );
};
