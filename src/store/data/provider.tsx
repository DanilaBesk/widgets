import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { DataContextValue, TNote, TNoteStorage, TWidget, TWidgetStorage } from './types';
import { DataContext } from './context';
import { NotesSerializerService } from '../../services/NoteSerializerService';
import { WidgetsSerializerService } from '../../services/WidgetSerializerService';

interface DataProviderProps {
  children: React.ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const NOTES_KEY = 'notes';
  const WIDGETS_KEY = 'widgets';

  const [notes, setNotes] = useState<TNoteStorage>(() => {
    const serializedNotes = localStorage.getItem(NOTES_KEY);
    if (!serializedNotes) return {};
    return NotesSerializerService.parse(serializedNotes);
  });

  const [widgets, setWidgets] = useState<TWidgetStorage>(() => {
    const serializedWidgets = localStorage.getItem(WIDGETS_KEY);
    if (!serializedWidgets) return {};
    return WidgetsSerializerService.parse(serializedWidgets);
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, NotesSerializerService.serialize(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(WIDGETS_KEY, WidgetsSerializerService.serialize(widgets));
  }, [widgets]);

  const addNote = useCallback<DataContextValue['addNote']>((title, text, isPinned) => {
    setNotes((prev) => {
      const id = Math.max(...Object.keys(prev).map(Number), 0) + 1;
      const newNote: TNote = {
        id,
        title,
        content: [{ type: 'text', text }],
        createdAt: new Date(),
        isPinned,
        pinTime: isPinned ? new Date() : null,
      };
      return {
        ...prev,
        [id]: newNote,
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
      const content = [...note.content];
      if (fields.content) {
        const { blockIndex, type } = fields.content;
        if (content[blockIndex].type === 'text') {
          if (type === 'replace') {
            content[blockIndex].text = fields.content.text;
          }
          if (type === 'split') {
            const prevText = content[blockIndex].text;
            const cursor = fields.content.cursorPosition;

            const before = prevText.slice(0, cursor);
            const after = prevText.slice(cursor);
            content.splice(
              blockIndex,
              1,
              { type: 'text', text: before },
              { type: 'text', text: after },
            );
          }
          if (type === 'delete') {
            //! TODO
            const blockText = content[blockIndex].text;
            content.splice(blockIndex, 1);
            if (blockText.length > 0 && blockIndex > 0) {
              for (let i = blockIndex - 1; i >= 0; i--) {
                const target = content[i];
                if (target.type === 'text') {
                  target.text += blockText;
                  break;
                }
              }
            }
          }
        }
      }
      const updatedNote: TNote = {
        ...note,
        ...fields,
        pinTime,
        content,
      };
      return {
        ...prev,
        [id]: updatedNote,
      };
    });
  }, []);

  const addWidget = useCallback<DataContextValue['addWidget']>(
    (type, config, noteId, blockIndex) => {
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

        const updatedContent = note.content;
        updatedContent.splice(blockIndex, 0, { id: newId, type: 'widget' });
        const updatedNote: TNote = {
          ...note,
          content: updatedContent,
        };
        return {
          ...prevNotes,
          [noteId]: updatedNote,
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
      const udpatedWidget: TWidget = { ...prev[id], config };
      return {
        ...prev,
        [id]: udpatedWidget,
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
