import Title from "../components/common/title/title";
import Button from "../components/common/button/button";

import DialogCreateForm from "../models/notes/DialogCreateNote";
import DialogSetFilter from "../models/notes/DialogSetFilter";
import NoteListsSection from "../models/notes/NoteListsSection";
import type { TNoteListsSectionHandle } from "../models/notes/NoteListsSection";
import { useEffect } from "react";

import { useState, useRef } from "react";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const noteListsSectionRef = useRef<TNoteListsSectionHandle | null>(null);

  const createNoteClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const setFilterClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenFilter(true);
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        setOpenFilter(true);
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

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
          <Button variant="accent" onClick={setFilterClickHandler}>
            Открыть фильтры
          </Button>
        </div>

        <NoteListsSection ref={noteListsSectionRef} />

        <DialogCreateForm open={open} onClose={() => setOpen(false)} />
        <DialogSetFilter
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          noteListsSectionRef={noteListsSectionRef}
        />
      </main>
    </>
  );
};

export default MainPage;
