import { createContext } from 'react';
import type { NoteContextValue } from './types';

export const NoteContext = createContext<NoteContextValue | null>(null);
