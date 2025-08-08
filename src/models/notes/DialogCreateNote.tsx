import { Dialog } from "../../components/common/dialog/dialog";
import Title from "../../components/common/title/title";
import { useState } from "react";
import Button from "../../components/common/button/button";
import Input from "../../components/common/input/input";
import { useNotes } from "./useNotes";
import { Pin } from "lucide-react";
import TextArea from "../../components/common/textarea/textArea";
import { toast } from "sonner";

interface NoteCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

const DialogCreateForm = ({ open, onClose }: NoteCreateDialogProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newNoteIsPinned, setNewNoteIsPinned] = useState(false);

  const { addNote } = useNotes();

  const createNoteClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && body) {
      addNote(title, body, newNoteIsPinned);
      setTitle('');
      setBody('');
      setNewNoteIsPinned(false);
      onClose();
    } else {
      toast.error("Введите заголовок и текст заметок");
    }
  };
  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewNoteIsPinned(newNoteIsPinned ? false : true);
  };

  return (
    <Dialog open={open} onDialogClose={onClose}>
      <Title level={1}>Создание заметок</Title>
      <div>
        <form className="form-container" onSubmit={createNoteClickHandler}>
          <Input
            compSize="lg"
            type="text"
            placeholder="Введите заголовок заметки"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="body-input-wrapper">
            <TextArea
              compSize="lg"
              placeholder="Введите текст заметки"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="btn-row">
            <Button onClick={onPinClickHandler} variant="ghost" compSize="sm">
              <Pin
                size={20}
                color={newNoteIsPinned ? "#46e856ff" : "#a3a3a3ff"}
                style={{ rotate: newNoteIsPinned ? "-90deg" : "0deg" }}
              />
            </Button>
            <Button
              type="submit"
              variant="accent"
              compSize="lg"
            >
              Create note
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
export default DialogCreateForm;
