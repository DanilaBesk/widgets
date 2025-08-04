import { useState } from "react";
import Button from "../button/button";
import Input from "../input/input";
import { useNotes } from "../../../models/notes/useNotes";
import { Pin } from "lucide-react";
import TextArea from "../textarea/textArea";

const CreateNoteForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newNoteIsPinned, setNewNoteIsPinned] = useState(false);

  const { addNote } = useNotes();

  const createNoteClickHandler = (
    title: string,
    body: string,
    newNoteIsPinned: boolean
  ) => {
    if (!(title == "" || body == "")) {
      addNote(title, body, newNoteIsPinned);
      setTitle("");
      setBody("");
      setNewNoteIsPinned(false);
      onClose();
    } else {
      alert("Введите заголовок и текст заметок");
    }
  };
  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setNewNoteIsPinned(newNoteIsPinned ? false : true);
  };
  return (
    <div>
      <div className="form-container">
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
        <Button onClick={onPinClickHandler} variant="accent" compSize="sm">
          <Pin
            size={20}
            color={newNoteIsPinned ? "#46e856ff" : "#a3a3a3ff"}
            style={{ rotate: newNoteIsPinned ? "-90deg" : "0deg" }}
          />
        </Button>
        <Button
          variant="accent"
          compSize="lg"
          onClick={() => createNoteClickHandler(title, body, newNoteIsPinned)}
        >
          Create note
        </Button>
      </div>
    </div>
  );
};

export default CreateNoteForm;
