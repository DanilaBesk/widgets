export type TNote = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  isPinned: boolean;
  pinTime?: Date;
};

export type TNoteStorage = Record<string, TNote | undefined>;

export type TNotesContext = {
  notes: TNoteStorage;
  addNote: (title: string, text: string) => void;
  deleteNote: (id: number) => void;
  updateNote: (
    id: number,
    updatedFields: Partial<Omit<TNote, "id" | "createdAt">>
  ) => void;
};
