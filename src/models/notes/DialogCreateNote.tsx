import { Dialog } from "../../components/common/dialog/dialog";
import Title from "../../components/common/title/title";
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
