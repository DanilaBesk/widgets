import { NoteList } from "./NoteList";

const NotesPage = () => {
  return (
    <>
      <header className="app-header">
        <h1>Мои заметки</h1>
        <button className="add-note-btn">+ Новая заметка</button>
      </header>
      <NoteList  />
    </>
  );
};

export default NotesPage;
