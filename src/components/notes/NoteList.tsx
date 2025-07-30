import NoteCard from "./NoteCard";
import type { TNote } from "./types";

interface NoteListProps {
  notes: TNote[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <NoteCard note={note} key={note.createdAt.getTime()} />
      ))}
    </div>
  );
};
