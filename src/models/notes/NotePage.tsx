import { useParams } from "react-router-dom";
import { useNotes } from "./useNotes";
import { NoteNotFound } from "./NoteNotFound";

const NotePage = () => {
  const { id } = useParams();
  const { notes } = useNotes();

  const note = id ? notes[Number(id)] : undefined;

  if (!note) {
    return <NoteNotFound />;
  }

  return (
    <div className="notes-container">
      <div className="note-card ">
        <h1 className="note-title">Заметка номер {id}</h1>
        <div>{note.text}</div>
        <div>{note.createdAt.toDateString()}</div>
      </div>
    </div>
  );
};

export default NotePage;
