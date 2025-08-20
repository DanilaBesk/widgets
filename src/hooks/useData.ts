import { useContext } from 'react';
import { DataContext } from '../store/data/context';
import type { DataContextValue } from '../store/data/types';

export function useData(): DataContextValue;
export function useData<T>(selector: (ctx: DataContextValue) => T): T;
export function useData<T>(selector?: (ctx: DataContextValue) => T): DataContextValue | T {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData должен использоваться внутри DataProvider');
  }
  return selector ? selector(ctx) : ctx;
}
