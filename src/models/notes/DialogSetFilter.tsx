import { Dialog } from "../../components/common/dialog/dialog";
import Button from "../../components/common/button/button";
import type { TNoteListsSectionHandle } from "./NoteListsSection";

interface TDialogSetFilter {
  open: boolean;
  onClose: () => void;
  noteListsSectionRef: React.RefObject<TNoteListsSectionHandle | null>;
}

const DialogSetFilter = ({
  open,
  onClose,
  noteListsSectionRef,
}: TDialogSetFilter) => {
  const showPinnedClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    noteListsSectionRef.current?.scrollToPinned();
    onClose();
  };

  const showCommonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    noteListsSectionRef.current?.scrollToCommon();
    onClose();
  };

  return (
    <Dialog open={open} onDialogClose={onClose}>
      <Button variant="ghost" onClick={showPinnedClickHandler}>
        Закреплённые заметки
      </Button>
      <Button variant="ghost" onClick={showCommonClickHandler}>
        Обычные заметки
      </Button>
    </Dialog>
  );
};

export default DialogSetFilter;
