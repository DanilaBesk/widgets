import { useNavigate } from "react-router-dom";
import type { TNote } from "./types";
import { useNotes } from "./useNotes";
import { Trash2 } from "lucide-react";
import { Pin } from "lucide-react";
import Title from "../../components/common/title/title";
import Button from "../../components/common/button/button";
import classNames from "classnames";

interface NoteCardProps {
  note: TNote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { deleteNote } = useNotes();
  const { updateNote } = useNotes();
  const navigate = useNavigate();

  const onDeleteClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const onViewClickHandler = () => {
    navigate("/notes/" + note.id);
  };

  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateNote(note.id, { isPinned: !note.isPinned });
  };

  return (
    <div
      className={classNames(["note-card", note.isPinned && "pinned"])}
      onClick={onViewClickHandler}
    >
      <div className="note-header">
        <Title level={3}>{note.title}</Title>
        <div className="note-actions">
          <Button onClick={onDeleteClickHandle} variant="ghost" compSize="sm">
            <Trash2 size={20} color="#e84646ff" />
          </Button>
          <Button onClick={onPinClickHandler} variant="ghost" compSize="sm">
            <Pin size={20} color={note.isPinned ? "#46e856ff" : "#a3a3a3ff"} />
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
