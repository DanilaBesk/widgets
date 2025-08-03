import Title from "../components/common/title/title";
import Button from "../components/common/button/button";
import { NoteList } from "../models/notes/NoteList";
import { useState } from "react";
import { Dialog } from "../components/common/dialog/dialog";

const MainPage = () => {
  const [open, setOpen] = useState(false);

  const createNoteClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
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
        <Dialog open={open} onDialogClose={() => setOpen(false)}>
          <Title level={1}>Hello</Title>
        </Dialog>
      </main>
    </>
  );
};

export default MainPage;
