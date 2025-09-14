import { useContext } from 'react';
import { NoteContext } from '../store/note/context';

export const useNote = () => {
  const note = useContext(NoteContext);
  if (!note) throw new Error('useNote должен использоваться внутри NoteProvider');
  return note;
};
