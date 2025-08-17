import { useContext } from 'react';
import { ModalContext } from '../store/modal/context';

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModals должен использоваться внутри ModalProvider');
  return ctx;
}
