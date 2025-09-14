import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import DialogCreateWeatherWidget from '../../components/widgets/weather/DialogCreateWeatherWidget';
import { useData } from '../../hooks/useData';
import styles from './index.module.css';
import { useModals } from '../../hooks/useModals';
import NoteContent from '../../components/notes/NoteContent';
import { useNote } from '../../hooks/useNote';

const NotePage = () => {
  const { note, cursorPosition } = useNote();
  const deleteNote = useData((ctx) => ctx.deleteNote);
  const navigate = useNavigate();
  const { openModal } = useModals();

  const openDialogWidgetCreate = () => {
    openModal((props) => (
      <DialogCreateWeatherWidget
        {...props}
        noteId={note.id}
        blockIndex={cursorPosition.current.blockIndex}
        cursorPosition={cursorPosition.current.position}
      />
    ));
  };

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
      <NoteContent />
    </div>
  );
};

export default NotePage;
