import NoteCardMini from "./NoteCardMini";
import { useNotes } from "./useNotes";
import type { TNote } from "./types";

export const NoteList = () => {
  const { notes } = useNotes();

  return (
    <div className="notes-container">
      {Object.values(notes)
        .filter((note): note is TNote => note !== undefined)
        .sort(
          (a, b) =>
            Number(b.isPinned) - Number(a.isPinned) ||
            (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0)
        )

        .map((note) => (
          <NoteCardMini note={note} key={note.id} />
        ))}
    </div>
  );
};
