import NoteCard from "./NoteCard";
import type { TNote } from "./types";
import { useNotes } from "./useNotes";

export const NoteList = () => {
  const { notes } = useNotes();
  

  return (
    <div className="notes-container">
      {Object.values(notes).map((note) =>
        note ? <NoteCard note={note} key={note.id} /> : null
      )}
    </div>
  );
};
