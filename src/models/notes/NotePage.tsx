import { useParams } from 'react-router-dom';
import { NoteNotFound } from './NoteNotFound';
import Title from '../../components/common/title/title';
import Button from '../../components/common/button/button';
import { useState } from 'react';
import DialogCreateWeatherWidget from '../widgets/weather/DialogCreateWeatherWidget';
import { ParserNote } from './parser-note';
import { toast } from 'sonner';
import Widget from '../widgets/Widget';
import { useData } from '../../hooks/useData';

const NotePage = () => {
  const { id } = useParams();
  const notes = useData((ctx) => ctx.notes);

  const [open, setOpen] = useState(false);

  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const note = id ? notes[Number(id)] : undefined;

  if (!note) {
    return <NoteNotFound />;
  }

  const parsedNote = ParserNote(note.text);
  if (parsedNote instanceof Error) {
    return toast.error(parsedNote.message);
  }

  return (
    <div className="notes-container">
      <Button variant="accent" onClick={() => setOpen(true)}>
        Создать виджет
      </Button>
      <DialogCreateWeatherWidget
        open={open}
        onClose={() => setOpen(false)}
        noteId={note.id}
        position={cursorPosition ?? note.text.length}
      />
      <div className="note-card">
        <Title level={1}>Заметка номер {id}</Title>
        <div>{note.createdAt.toLocaleString()}</div>
        <div>
          {parsedNote.map((stroke, index) =>
            typeof stroke === 'string' ? (
              <p key={index}>{stroke}</p>
            ) : (
              <Widget key={index} widgetId={stroke} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
