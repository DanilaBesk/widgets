import { useNavigate } from 'react-router-dom';
import { Pin } from '../icons/Pin';
import Title from '../../common/Title';
import Button from '../../common/Button';
import type { TNote } from '../../../store/data/types';
import { useData } from '../../../hooks/useData';
import { formatDate } from '../lib/formatDate';
import styles from './index.module.css';
import { Flex } from '../../common/Flex';
import { Trash } from '../icons/Trash';

interface NotePreviewProps {
  note: TNote;
}

export const NotePreview = ({ note }: NotePreviewProps) => {
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

  const previewText = note.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join(' ');

  return (
    <Flex direction="column" className={styles.container} onClick={onViewClickHandler}>
      <Flex justify="between" items="start">
        <Title className="ellipsis" level={3}>
          {note.title}
        </Title>
        <Flex>
          <Button onClick={onDeleteClickHandle} variant="icon" compSize="sm">
            <Trash />
          </Button>
          <Button onClick={onPinClickHandler} variant="icon" compSize="sm">
            <Pin isPinned={note.isPinned} />
          </Button>
        </Flex>
      </Flex>
      <div className={styles.content}>
        <p className="ellipsis">{previewText}</p>
      </div>
      <div className={styles.date}>{formatDate(note.createdAt)}</div>
    </Flex>
  );
};
