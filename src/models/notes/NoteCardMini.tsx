import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Pin } from 'lucide-react';
import Title from '../../components/common/title/title';
import Button from '../../components/common/button/button';
import cn from 'classnames';
import { ParserNote } from './parser-note';
import { toast } from 'sonner';
import type { TNote } from '../../store/data/types';
import { useData } from '../../hooks/useData';

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

  const parsedNote = ParserNote(note.text);
  if (parsedNote instanceof Error) {
    return toast.error(parsedNote.message);
  }

  let miniText = parsedNote
    .filter((t) => typeof t === 'string')
    .join()
    .slice(0, 103);
  if (miniText.length >= 103) {
    miniText = miniText.slice(0, 100) + '...';
  }

  return (
    <div className={cn(['note-card', note.isPinned && 'pinned'])} onClick={onViewClickHandler}>
      <div className="note-header">
        <Title level={3}>
          {note.id}
          {')'} {note.title}
        </Title>
        <div className="note-actions">
          <Button onClick={onDeleteClickHandle} variant="ghost" compSize="sm">
            <Trash2 size={20} color="#e84646ff" />
          </Button>
          <Button onClick={onPinClickHandler} variant="ghost" compSize="sm">
            <Pin
              size={20}
              color={note.isPinned ? '#46e856ff' : '#a3a3a3ff'}
              style={{ rotate: note.isPinned ? '-90deg' : '0deg' }}
            />
          </Button>
        </div>
      </div>
      <div className="note-content">
        <p>{miniText}</p>
      </div>
      <div className="note-date">{note.createdAt.toLocaleString()}</div>
    </div>
  );
};

export default NoteCard;
