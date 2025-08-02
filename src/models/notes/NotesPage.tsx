import { NoteList } from "./NoteList";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const navigate = useNavigate();
  const createNoteClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/notes/create-note");
  };

  return (
    <>
      <header className="app-header">
        <h1>Мои заметки</h1>
        <button className="add-note-btn" onClick={createNoteClickHandler}>
          + Новая заметка
        </button>
      </header>
      <NoteList />
    </>
  );
};

export default NotesPage;
