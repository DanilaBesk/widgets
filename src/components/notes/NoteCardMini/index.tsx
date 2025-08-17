import { useNavigate } from 'react-router-dom';
import { Pin } from '../icons/Pin';
import Title from '../../common/Title';
import Button from '../../common/Button';
import { parseNote } from '../lib/parse-note';
import { toast } from 'sonner';
import type { TNote } from '../../../store/data/types';
import { useData } from '../../../hooks/useData';
import { formatDate } from '../lib/format-date';
import styles from './index.module.css';
import { Flex } from '../../common/Flex';
import { Trash } from '../icons/Trash';

interface NoteCardProps {
  note: TNote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const updateNote = useData((ctx) => ctx.updateNote);
  const deleteNote = useData((ctx) => ctx.deleteNote);

  const navigate = useNavigate();

  const onDeleteClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const onViewClickHandler = () => {
    navigate('/notes/' + note.id);
  };

  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateNote(note.id, { isPinned: !note.isPinned });
  };

  const parsedNote = parseNote(note.text);
  if (parsedNote instanceof Error) {
    return toast.error(parsedNote.message);
  }

  const text = parsedNote.filter((t) => typeof t === 'string').join();

  return (
    <Flex direction="column" className={styles.noteMini} onClick={onViewClickHandler}>
      <Flex justify="between" items="start">
        <Title level={3}>{note.title}</Title>
        <Flex>
          <Button onClick={onDeleteClickHandle} variant="icon" compSize="sm">
            <Trash />
          </Button>
          <Button onClick={onPinClickHandler} variant="icon" compSize="sm">
            <Pin isPinned={note.isPinned} />
          </Button>
        </Flex>
      </Flex>
      <div className={styles.noteContent}>
        <p className="ellipsis">{text}</p>
      </div>
      <div className={styles.noteDate}>{formatDate(note.createdAt)}</div>
    </Flex>
  );
};

export default NoteCard;
