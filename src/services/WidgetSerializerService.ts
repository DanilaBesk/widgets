import type { TWidgetStorage, TWidgetStorageSerialized } from '../store/data/types';

export class WidgetsSerializerService {
  static parse(serializedWidgets: string): TWidgetStorage {
    const result: TWidgetStorage = {};
    const parsed: TWidgetStorageSerialized = JSON.parse(serializedWidgets);

    for (const id in parsed) {
      const widget = parsed[id];
      if (widget) {
        const { config: serializedConfig, id, type } = widget;
        let config = {};
        switch (type) {
          case 'weather':
            config = serializedConfig;
        }
        result[id] = {
          id,
          type,
          config,
        };
      }
    }
    return result;
  }

  static serialize(widgets: TWidgetStorage): string {
    const result: TWidgetStorageSerialized = {};

    for (const id in widgets) {
      const widget = widgets[id];
      if (widget) {
        const { id, type, config } = widget;
        let configSerialized = {};

        switch (type) {
          case 'weather':
            configSerialized = config;
        }

        result[id] = {
          id,
          type,
          config: configSerialized,
        };
      }
    }

    return JSON.stringify(result);
  }
}
