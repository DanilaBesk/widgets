import { useNavigate } from "react-router-dom";
import type { TNote } from "./types";
import { useNotes } from "./useNotes";

interface NoteCardProps {
  note: TNote;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  const onEditClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/notes/" + note.id + "/edit");
  };

  const onDeleteClickHandle = () => {
    deleteNote(note.id);
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h2 className="note-title">{note.title}</h2>
        <div className="note-actions">
          <button onClick={onEditClickHandle} className="edit-btn">
            ✏️
          </button>
          <button className="delete-btn" onClick={onDeleteClickHandle}>
            🗑
          </button>
        </div>
      </div>
      <div className="note-content">
        <p>{note.text}</p>
      </div>
      <div className="note-date">{note.createdAt.toLocaleString()}</div>
    </div>
    // <div className="notes-container">
    //     <div className="note-card new-note-template">
    //       <div className="note-header">
    //         <input
    //           type="text"
    //           className="note-title-input"
    //           placeholder="Введите заголовок"
    //         />
    //       </div>
    //       <div className="note-content">
    //         <textarea
    //           className="note-content-input"
    //           placeholder="Начните писать заметку..."
    //         ></textarea>
    //       </div>
    //       <div className="note-actions-bottom">
    //         <button className="save-btn">Сохранить</button>
    //         <button className="cancel-btn">Отмена</button>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default NoteCard;
