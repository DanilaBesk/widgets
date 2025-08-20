import type { UnionToMap } from '../../lib/utility-types';
import type { TWeatherWidget } from '../../components/widgets/weather/types';

export type TNote = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  isPinned: boolean;
  pinTime: Date | null;
};

export type TNoteStorage = Record<string, TNote | undefined>;

export type TWidgetCommon<C extends Record<string, any>, T extends string> = {
  id: number;
  type: T;
  config: C;
};

export type TWidget = TWeatherWidget;

type TWidgetType = TWidget['type'];
type TWidgetConfig = TWidget['config'];

export type TWidgetStorage = Record<string, TWidget | undefined>;

export interface DataContextValue {
  notes: TNoteStorage;
  addNote: (title: string, text: string, isPinned: boolean) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, fields: Partial<Pick<TNote, 'isPinned' | 'text' | 'title'>>) => void;

  widgets: TWidgetStorage;
  addWidget: <T extends TWidgetType>(
    type: T,
    config: UnionToMap<TWidget, 'type'>[T]['config'],
    noteId: number,
    position: number,
  ) => void;
  deleteWidget: (id: number) => void;
  updateWidget: (id: number, config: TWidgetConfig) => void;
}
