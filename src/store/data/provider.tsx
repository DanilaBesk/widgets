import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import type { DataContextValue, TNoteStorage, TWidgetStorage } from './types';
import { DataContext } from './context';

export function DataProvider({ children }: { children: ReactNode }) {
  const NOTES_KEY = 'notes';
  const WIDGETS_KEY = 'widgets';

  const [notes, setNotes] = useState<TNoteStorage>(() => {
    const stored = localStorage.getItem(NOTES_KEY);
    if (!stored) return {};
    try {
      const parsed: TNoteStorage = JSON.parse(stored);
      for (const id in parsed) {
        const note = parsed[id];
        if (note) {
          note.createdAt = new Date(note.createdAt);
          if (note.pinTime) {
            note.pinTime = new Date(note.pinTime);
          }
        }
      }
      return parsed;
    } catch (error) {
      console.log('Ошибка чтения заметок:', error);
      toast.error('Ошибка чтения заметок');
      return {};
    }
  });

  const [widgets, setWidgets] = useState<TWidgetStorage>(() => {
    const stored = localStorage.getItem(WIDGETS_KEY);
    try {
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.log('Ошибка чтения виджетов:', error);
      toast.error('Ошибка чтения виджетов');
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
  }, [widgets]);

  const addNote = useCallback<DataContextValue['addNote']>((title, text, isPinned) => {
    setNotes((prev) => {
      const id = Math.max(...Object.keys(prev).map(Number), 0) + 1;
      return {
        ...prev,
        [id]: {
          id,
          title,
          text,
          createdAt: new Date(),
          isPinned,
          pinTime: isPinned ? new Date() : null,
        },
      };
    });
  }, []);

  const deleteNote = useCallback<DataContextValue['deleteNote']>((id) => {
    setNotes((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateNote = useCallback<DataContextValue['updateNote']>((id, fields) => {
    setNotes((prev) => {
      const note = prev[id];
      if (!note) {
        toast.error('Не смог найти заметку.');
        return prev;
      }
      let pinTime = note.pinTime;
      if (fields.isPinned) {
        pinTime = new Date();
      } else if (fields.isPinned === false) {
        pinTime = null;
      }
      return {
        ...prev,
        [id]: { ...note, ...fields, pinTime },
      };
    });
  }, []);

  const addWidget = useCallback<DataContextValue['addWidget']>(
    (type, config, noteId, position) => {
      setNotes((prevNotes) => {
        const note = prevNotes[noteId];
        if (!note) {
          toast.error('Не смог найти заметку.');
          return prevNotes;
        }
        const newId = Math.max(...Object.keys(widgets).map(Number), 0) + 1;

        setWidgets((prevWidgets) => ({
          ...prevWidgets,
          [newId]: { id: newId, type, config },
        }));

        const widgetAnchor = `<${newId}>`;
        return {
          ...prevNotes,
          [noteId]: {
            ...note,
            text: note.text.slice(0, position) + widgetAnchor + note.text.slice(position),
          },
        };
      });
    },
    [widgets],
  );

  const deleteWidget = useCallback<DataContextValue['deleteWidget']>((id) => {
    setWidgets((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateWidget = useCallback<DataContextValue['updateWidget']>((id, config) => {
    setWidgets((prev) => {
      if (!prev[id]) {
        toast.error('Не смог найти виджет.');
        return prev;
      }
      return {
        ...prev,
        [id]: { ...prev[id], config },
      };
    });
  }, []);

  const value: DataContextValue = {
    notes,
    widgets,
    addNote,
    deleteNote,
    updateNote,
    addWidget,
    deleteWidget,
    updateWidget,
  };

  return <DataContext value={value}>{children}</DataContext>;
}
