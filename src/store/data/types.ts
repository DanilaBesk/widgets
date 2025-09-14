import type { UnionToMap } from '../../lib/utility-types';
import type { TWeatherWidget } from '../../components/widgets/weather/types';

export type TNoteContent = { type: 'text'; text: string } | { type: 'widget'; id: number };

export type TNote = {
  id: number;
  title: string;
  content: TNoteContent[];
  createdAt: Date;
  isPinned: boolean;
  pinTime: Date | null;
};

export type TNoteSerialized = Omit<TNote, 'content' | 'createdAt' | 'pinTime'> & {
  content: string;
  createdAt: string;
  pinTime: string | null;
};

export type TNoteStorageSerialized = Record<string, TNoteSerialized | undefined>;
export type TNoteStorage = Record<string, TNote | undefined>;

export type TWidgetCommon<C extends Record<string, unknown>, T extends string> = {
  id: number;
  type: T;
  config: C;
};

export type TWidget = TWeatherWidget;
type TWidgetSerialized = {
  id: number;
  type: TWidget['type'];
  config: Record<string, unknown>;
};

type TWidgetType = TWidget['type'];
type TWidgetConfig = TWidget['config'];

export type TWidgetStorage = Record<string, TWidget | undefined>;
export type TWidgetStorageSerialized = Record<string, TWidgetSerialized | undefined>;

type UpdateNoteFields = {
  isPinned?: boolean;
  title?: string;
  content?: { blockIndex: number } & (
    | { type: 'replace'; text: string }
    | {
        type: 'split';
        cursorPosition: number;
      }
    | {
        type: 'delete';
      }
  );
};

export interface DataContextValue {
  notes: TNoteStorage;

  addNote: (title: string, text: string, isPinned: boolean) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, fields: UpdateNoteFields) => void;

  widgets: TWidgetStorage;
  addWidget: <T extends TWidgetType>(
    type: T,
    config: UnionToMap<TWidget, 'type'>[T]['config'],
    noteId: number,
    blockIndex: number,
    cursorPosition?: number,
  ) => void;
  deleteWidget: (id: number) => void;
  updateWidget: (id: number, config: TWidgetConfig) => void;
}
