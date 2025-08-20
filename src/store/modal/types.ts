export interface ModalElementProps {
  close: () => void;
  index: number;
  id: number;
}

type ModalElement = (props: ModalElementProps) => React.ReactNode;

type CloseModal = (id: number) => void;
type OpenModal = (element: ModalElement) => number;

export interface ModalContextValue {
  openModal: OpenModal;
  closeModal: CloseModal;
}

export type ModalStorage = {
  id: number;
  element: ModalElement;
};

export type ModalWrapper = {
  id: number;
  index: number;
  element: ModalElement;
  closeModal: CloseModal;
};
