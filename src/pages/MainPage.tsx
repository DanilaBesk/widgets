import { useNavigate } from "react-router-dom";
import Title from "../components/common/title/title";
import Button from "../components/common/button/button";
import { NoteList } from "../models/notes/NoteList";

const MainPage = () => {
  const navigate = useNavigate();
  const createNoteClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/notes/create");
  };

  return (
    <>
      <header className="app-header">
        <Title level={1}>Заметки</Title>
      </header>
      <main className="main">
        <div className="actions-container">
          <Button variant="accent" onClick={createNoteClickHandler}>
            + Новая заметка
          </Button>
        </div>
        <NoteList />
      </main>
    </>
  );
};

export default MainPage;
