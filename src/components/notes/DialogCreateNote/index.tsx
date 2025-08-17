import { Dialog } from '../../common/Dialog';
import Title from '../../common/Title';
import { useState } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { Pin } from '../icons/Pin';
import TextArea from '../../common/TextArea';
import { toast } from 'sonner';
import { useData } from '../../../hooks/useData';
import { Flex } from '../../common/Flex';
import styles from './index.module.css';
import type { ModalElementProps } from '../../../store/modal/types';

const DialogCreateNote = ({ close }: ModalElementProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [newNoteIsPinned, setNewNoteIsPinned] = useState(false);

  const addNote = useData((ctx) => ctx.addNote);

  const createNoteClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title) {
      addNote(title, body, newNoteIsPinned);
      setTitle('');
      setBody('');
      setNewNoteIsPinned(false);
      close();
    } else {
      toast.error('Введите заголовок заметки');
    }
  };
  const onPinClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewNoteIsPinned(newNoteIsPinned ? false : true);
  };

  return (
    <Dialog onDialogClose={close}>
      <Title level={1}>Создание заметок</Title>
      <div>
        <Flex
          as="form"
          direction="column"
          justify="start"
          gap="0.625rem"
          onSubmit={createNoteClickHandler}
        >
          <Input
            compSize="lg"
            type="text"
            placeholder="Введите заголовок заметки"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            className={styles.textArea}
            compSize="lg"
            placeholder="Введите текст заметки"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Flex justify="end">
            <Button onClick={onPinClickHandler} variant="icon">
              <Pin isPinned={newNoteIsPinned} />
            </Button>
            {/* //TODO: на этом фоне кнопка акцента выглядит ужасно */}
            <Button type="submit" variant="accent">
              Создать
            </Button>
          </Flex>
        </Flex>
      </div>
    </Dialog>
  );
};
export default DialogCreateNote;
