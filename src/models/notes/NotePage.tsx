import { useParams } from "react-router-dom";
import { useNotes } from "./useNotes";
import { NoteNotFound } from "./NoteNotFound";
import Title from "../../components/common/title/title";

const NotePage = () => {
  const { id } = useParams();
  const { notes } = useNotes();

  const note = id ? notes[Number(id)] : undefined;

  if (!note) {
    return <NoteNotFound />;
  }

  return (
    <div className="notes-container">
      <div className="note-card">
        <Title level={1}>Заметка номер {id}</Title>
        <div>{note.text}</div>
        <div>{note.createdAt.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default NotePage;
