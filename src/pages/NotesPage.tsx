import { NoteList } from "../components/notes/NoteList";

const NotesPage = () => {
  return (
    <>
      <header className="app-header">
        <h1>Мои заметки</h1>
        <button className="add-note-btn">+ Новая заметка</button>
      </header>
      <NoteList notes={[]} />
    </>
  );
};

export default NotesPage;
