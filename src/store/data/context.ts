import { createContext } from 'react';
import type { DataContextValue } from './types';

export const DataContext = createContext<DataContextValue | null>(null);
