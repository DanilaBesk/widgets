import { useEffect, useState, type ReactNode } from "react";
import type { TNote, TNoteStorage } from "./types";
import { NotesContext } from "./NotesContext";

export function NotesProvider({ children }: { children: ReactNode }) {
  const STORAGE_KEY = "notes";

  const defaultNotes: TNoteStorage = {
    1: {
      id: 1,
      title: "Покупки",
      text: "Купить хлеб, молоко и сыр.",
      createdAt: new Date("2025-07-30T10:00:00"),
      isPinned: false,
      pinTime: null,
    },
    2: {
      id: 2,
      title: "Идея проекта",
      text: "Создать приложение для заметок с тегами и поиском.",
      createdAt: new Date("2025-07-31T14:30:00"),
      isPinned: false,
      pinTime: null,
    },
    3: {
      id: 3,
      title: "Цели на август",
      text: "1. Начать бегать утром.\n2. Закончить мини-проект на React.\n3. Прочитать 1 книгу.",
      createdAt: new Date("2025-08-01T09:15:00"),
      isPinned: true,
      pinTime: new Date(),
    },
    4: {
      id: 4,
      title: "Покупки",
      text: "Купить хлеб, молоко и сыр.",
      createdAt: new Date("2025-07-30T10:00:00"),
      isPinned: false,
      pinTime: null,
    },
    5: {
      id: 5,
      title: "Идея проекта",
      text: "Создать приложение для заметок с тегами и поиском.",
      createdAt: new Date("2025-07-31T14:30:00"),
      isPinned: false,
      pinTime: null,
    },
    6: {
      id: 6,
      title: "Цели на август",
      text: "1. Начать бегать утром.\n2. Закончить мини-проект на React.\n3. Прочитать 1 книгу.",
      createdAt: new Date("2025-08-01T09:15:00"),
      isPinned: true,
      pinTime: new Date(),
    },
    7: {
      id: 7,
      title: "Покупки",
      text: "Купить хлеб, молоко и сыр.",
      createdAt: new Date("2025-07-30T10:00:00"),
      isPinned: false,
      pinTime: null,
    },
    8: {
      id: 8,
      title: "Идея проекта",
      text: "Создать приложение для заметок с тегами и поиском.",
      createdAt: new Date("2025-07-31T14:30:00"),
      isPinned: false,
      pinTime: null,
    },
    9: {
      id: 9,
      title: "Цели на август",
      text: "1. Начать бегать утром.\n2. Закончить мини-проект на React.\n3. Прочитать 1 книгу.",
      createdAt: new Date("2025-08-01T09:15:00"),
      isPinned: true,
      pinTime: new Date(),
    },
    10: {
      id: 10,
      title: "Покупки",
      text: "Купить хлеб, молоко и сыр.",
      createdAt: new Date("2025-07-30T10:00:00"),
      isPinned: false,
      pinTime: null,
    },
    11: {
      id: 11,
      title: "Идея проекта",
      text: "Создать приложение для заметок с тегами и поиском.",
      createdAt: new Date("2025-07-31T14:30:00"),
      isPinned: false,
      pinTime: null,
    },
    12: {
      id: 12,
      title: "Цели на август",
      text: "1. Начать бегать утром.\n2. Закончить мини-проект на React.\n3. Прочитать 1 книгу.",
      createdAt: new Date("2025-08-01T09:15:00"),
      isPinned: true,
      pinTime: new Date(),
    },
  };

  const [notes, setNotes] = useState<TNoteStorage>(() => {
    const stored = localStorage.getItem("notes");
    if (!stored) {
      return defaultNotes;
    }
    try {
      const parsed = JSON.parse(stored);

      for (const id in parsed) {
        parsed[id].createdAt = new Date(parsed[id].createdAt);
        parsed[id].pinTime = parsed[id].pinTime
          ? new Date(parsed[id].pinTime)
          : null;
      }
      return parsed;
    } catch {
      return defaultNotes;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, text: string, isPinned: boolean) => {
    const noteKeys = Object.keys(notes).length;
    const newId =
      noteKeys > 0 ? Math.max(...Object.keys(notes).map(Number)) + 1 : 1;
    const pinTime = isPinned ? new Date() : null;

    const newNote: TNote = {
      id: newId,
      title,
      text,
      createdAt: new Date(),
      isPinned: isPinned ?? false,
      pinTime,
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
    updatedFields: Partial<Pick<TNote, "isPinned" | "text" | "title">>
  ) => {
    setNotes((prev) => {
      if (!prev[id]) return prev;

      const pinTime = updatedFields.isPinned ? new Date() : null;

      return {
        ...prev,
        [id]: {
          ...prev[id],
          ...Object.fromEntries(
            Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
          ),
          pinTime,
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
