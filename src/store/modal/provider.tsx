import { memo, useCallback, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './context';
import type { ModalStorage, ModalContextValue, ModalWrapper } from './types';

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalStorage[]>([]);

  const openModal = useCallback<ModalContextValue['openModal']>((element) => {
    const id = Date.now();
    setModals((prev) => [...prev, { id, element }]);
    return id;
  }, []);

  const closeModal = useCallback<ModalContextValue['closeModal']>((id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalContext value={contextValue}>
      {children}
      {createPortal(
        <>
          {modals.map(({ id, element }, index) => {
            return (
              <ModalWrapper
                key={id}
                id={id}
                index={index}
                element={element}
                closeModal={closeModal}
              />
            );
          })}
        </>,
        document.body,
      )}
    </ModalContext>
  );
}

const ModalWrapper = memo(({ id, index, element, closeModal }: ModalWrapper) => {
  const close = () => closeModal(id); //создаем внутри memo компонента чтобы не было перерисовки
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 + index }}>
      {element({ id, index, close })}
    </div>
  );
});
