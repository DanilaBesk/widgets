import { useEffect, useState, type ReactNode } from "react";
import type { TNote, TNoteStorage } from "./types";
import { NotesContext } from "./NotesContext";

export function NotesProvider({ children }: { children: ReactNode }) {
  const STORAGE_KEY = "notes";

  const [notes, setNotes] = useState<TNoteStorage>(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify({
        1: {
          id: 1,
          title: "Покупки",
          text: "Купить хлеб, молоко и сыр.",
          createdAt: new Date("2025-07-30T10:00:00"),
          isPinned: false,
        },
        2: {
          id: 2,
          title: "Идея проекта",
          text: "Создать приложение для заметок с тегами и поиском.",
          createdAt: new Date("2025-07-31T14:30:00"),
          isPinned: false,
        },
        3: {
          id: 3,
          title: "Цели на август",
          text: "1. Начать бегать утром.\n2. Закончить мини-проект на React.\n3. Прочитать 1 книгу.",
          createdAt: new Date("2025-08-01T09:15:00"),
          isPinned: true,
        },
      })
    );
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = stored ? (JSON.parse(stored) as TNoteStorage) : {};

      for (const id in parsed) {
        const note = parsed[id];
        if (note) {
          note.createdAt = new Date(note.createdAt);
        }
      }
      return parsed;
    } catch (error) {
      console.error(error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, text: string, isPinned?: boolean) => {
    const noteKeys = Object.keys(notes).length;
    const newId =
      noteKeys > 0 ? Math.max(...Object.keys(notes).map(Number)) + 1 : 1;
    const newNote: TNote = {
      id: newId,
      title,
      text,
      createdAt: new Date(),
      isPinned: isPinned ?? false,
    };
    setNotes((prev) => ({ ...prev, [newId]: newNote }));
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateNote = (
    id: number,
    updatedFields: Partial<Omit<TNote, "id" | "createdAt" | "isPinned">>
  ) => {
    setNotes((prev) => {
      if (!prev[id]) return prev;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          ...Object.fromEntries(
            Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
          ),
        },
      };
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
