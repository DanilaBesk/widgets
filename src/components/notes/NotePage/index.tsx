import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../common/Title';
import Button from '../../common/Button';
import { useState } from 'react';
import DialogCreateWeatherWidget from '../../widgets/weather/DialogCreateWeatherWidget';
import { parseNote } from '../lib/parse-note';
import { toast } from 'sonner';
import Widget from '../../widgets/Widget';
import { useData } from '../../../hooks/useData';
import styles from './index.module.css';
import { formatDate } from '../lib/format-date';
import { useModals } from '../../../hooks/useModals';

const NotePage = () => {
  const { id } = useParams();
  const notes = useData((ctx) => ctx.notes);
  const deleteNote = useData((ctx) => ctx.deleteNote);

  const navigate = useNavigate();

  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const { openModal } = useModals();

  const note = id ? notes[Number(id)] : undefined;

  if (!note) {
    return (
      <div className={styles.container}>
        <div className={styles.note}>
          <Title level={2}>Заметка не найдена</Title>
        </div>
      </div>
    );
  }

  const openDialogWidgetCreate = () => {
    openModal((props) => (
      <DialogCreateWeatherWidget
        {...props}
        noteId={note.id}
        position={cursorPosition ?? note.text.length}
      />
    ));
  };

  const parsedNote = parseNote(note.text);
  if (parsedNote instanceof Error) {
    return toast.error(parsedNote.message);
  }

  const handleDeleteNote = () => {
    deleteNote(note.id);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Button onClick={() => navigate('/')}>Назад</Button>
      <Button variant="accent" onClick={() => {}}>
        Редактировать
      </Button>
      <Button variant="accent" onClick={openDialogWidgetCreate}>
        Создать виджет
      </Button>
      <Button variant="danger" onClick={handleDeleteNote}>
        Удалить
      </Button>
      <div className={styles.note}>
        <Title level={1}>{note.title}</Title>
        <div className={styles.createdAt}>{formatDate(note.createdAt)}</div>
        <div>
          {parsedNote.map((stroke, index) =>
            typeof stroke === 'string' ? (
              <p className={styles.stroke} key={index}>
                {stroke}
              </p>
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
