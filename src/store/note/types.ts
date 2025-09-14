import type { RefObject } from 'react';
import type { TNote } from '../data/types';

export interface NoteContextValue {
  note: TNote;
  cursorPosition: RefObject<{
    blockIndex: number;
    position: number;
  }>;
}
