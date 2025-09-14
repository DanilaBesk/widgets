import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { NotePreviewList } from '../../components/notes/NotePreviewList';
import { DialogCreateNote } from '../../components/notes/DialogCreateNote';
import styles from './index.module.css';
import { Flex } from '../../components/common/Flex';
import { useModals } from '../../hooks/useModals';

export const MainPage = () => {
  const { openModal } = useModals();

  const openDialogCreateNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal(DialogCreateNote);
  };

  return (
    <>
      <Flex as="header" direction="column" items="center" className={styles.header}>
        <Title level={1}>Заметки</Title>
      </Flex>
      <Flex as="main" direction="column" justify="center" gap="1rem">
        <Flex items="center" justify="start">
          <Button variant="accent" onClick={openDialogCreateNote}>
            + Новая заметка
          </Button>
        </Flex>
        <NotePreviewList />
      </Flex>
    </>
  );
};
