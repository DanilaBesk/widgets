import { Dialog } from "./dialog";
import Title from "../title/title";
import CreateNoteForm from "./CreateNoteForm";

interface NoteCreateDialogProps {
  open: boolean;
  onClose: () => void;
}

const DialogCreateForm = ({ open, onClose }: NoteCreateDialogProps) => {
  return (
    <>
      <Dialog open={open} onDialogClose={onClose}>
        <Title level={1}>Создание заметок</Title>
        <CreateNoteForm onClose={onClose} />
      </Dialog>
    </>
  );
};
export default DialogCreateForm;
