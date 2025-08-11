import NoteCardMini from "./NoteCardMini";
import type { TNote } from "./types";

interface TNoteList {
  filteredNotes: TNote[];
}

export const NoteList = ({ filteredNotes }: TNoteList) => {
  return (
    <div className="notes-container">
      {/* {Object.values(filteredNotes)
        .filter((note) => !!note)
        .sort(
          (a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0)
        )
        .map((note) => (
          <NoteCardMini note={note} key={note.id} />
        ))} */}
      {filteredNotes.map((note) => (
        <NoteCardMini note={note} key={note.id} />
      ))}
    </div>
  );
};
