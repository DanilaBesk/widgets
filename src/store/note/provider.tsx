import { useRef } from 'react';
import type { TNote } from '../data/types';
import { NoteContext } from './context';

interface NoteProviderProps {
  note: TNote;
  children: React.ReactNode;
}

export function NoteProvider({ children, note }: NoteProviderProps) {
  const cursorPosition = useRef<{
    blockIndex: number;
    position: number;
  }>({ blockIndex: 0, position: 0 });

  const value = {
    note,
    cursorPosition,
  };

  return <NoteContext value={value}>{children}</NoteContext>;
}
