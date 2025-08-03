import { useNavigate } from "react-router-dom";
import type { TNote } from "./types";
import { useNotes } from "./useNotes";
import { Trash2 } from "lucide-react";
import Title from "../../components/common/title/title";
import Button from "../../components/common/button/button";

interface NoteCardProps {
  note: TNote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  const onDeleteClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const onViewClickHandler = () => {
    navigate("/notes/" + note.id);
  };

  return (
    <div className="note-card" onClick={onViewClickHandler}>
      <div className="note-header">
        <Title level={3}>{note.title}</Title>
        <div className="note-actions">
          <Button onClick={onDeleteClickHandle} variant="danger" compSize="sm">
            <Trash2 size={20} color="#e84646ff" />
          </Button>
        </div>
      </div>
      <div className="note-content">
        <p>{note.text}</p>
      </div>
      <div className="note-date">{note.createdAt.toLocaleString()}</div>
    </div>
  );
};

export default NoteCard;
