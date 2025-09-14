import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useData } from '../../../hooks/useData';
import { NoteProvider } from '../../../store/note/provider';
import { useEffect } from 'react';

interface NoteGuardProps {
  children: React.ReactNode;
}

export const NoteGuard = ({ children }: NoteGuardProps) => {
  const { id } = useParams();
  const note = useData((ctx) => (id ? ctx.notes[Number(id)] : undefined));

  useEffect(() => {
    if (!note) toast.error('Заметка не найдена');
  }, [note]);

  if (!note) {
    return <Navigate to="/" replace />;
  }

  return <NoteProvider note={note}>{children}</NoteProvider>;
};
