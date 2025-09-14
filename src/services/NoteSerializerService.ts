import type { TNote, TNoteStorage, TNoteStorageSerialized } from '../store/data/types';

export type ParsedContent = ({ type: 'text'; text: string } | { type: 'widget'; id: number })[];

type Token = { char: string; escaped: boolean };

export class NotesSerializerService {
  private static isDigit(ch: string) {
    return ch >= '0' && ch <= '9';
  }

  private static tokenizeContentLine(line: string): Token[] {
    const tokens: Array<{ char: string; escaped: boolean }> = [];
    for (let i = 0; i < line.length; ) {
      const ch = line[i];
      if (ch === '\\') {
        const next = i + 1 < line.length ? line[i + 1] : undefined;
        if (next === '<' || next === '>' || next === '\\') {
          tokens.push({ char: next, escaped: true });
          i += 2;
        } else {
          tokens.push({ char: '\\', escaped: false });
          i += 1;
        }
      } else {
        tokens.push({ char: ch, escaped: false });
        i += 1;
      }
    }
    return tokens;
  }

  static parse(serializedNotes: string): TNoteStorage {
    const result: TNoteStorage = {};
    const parsed: TNoteStorageSerialized = JSON.parse(serializedNotes);

    for (const id in parsed) {
      const note = parsed[id];
      if (note) {
        const {
          pinTime: pinTimeSerialized,
          createdAt: createdAtSerialized,
          content: contentSerialized,
          ...rest
        } = note;
        const createdAt = new Date(createdAtSerialized);
        const pinTime = pinTimeSerialized ? new Date(pinTimeSerialized) : null;

        const lines = note.content.split('\n');
        const parsedContent: ParsedContent = [];
        let error: Error | null = null;

        for (let li = 0; li < lines.length; li++) {
          const line = lines[li];
          const tokens = this.tokenizeContentLine(line);

          if (
            tokens.length >= 3 &&
            tokens[0].char === '<' &&
            tokens[0].escaped === false &&
            tokens[tokens.length - 1].char === '>' &&
            tokens[tokens.length - 1].escaped === false
          ) {
            let allDigits = true;
            for (let k = 1; k < tokens.length - 1; k++) {
              if (tokens[k].escaped || !this.isDigit(tokens[k].char)) {
                allDigits = false;
                break;
              }
            }
            if (allDigits) {
              const idStr = tokens
                .slice(1, tokens.length - 1)
                .map((t) => t.char)
                .join('');
              if (idStr.trim() === '') {
                error = new Error(`Ошибка парсинга: пустой id виджета в строке ${li + 1}`);
                break;
              }
              const id = Number(idStr);
              if (isNaN(id)) {
                error = new Error(`Ошибка парсинга: id виджета не число в строке ${li + 1}`);
                break;
              }
              parsedContent.push({ type: 'widget', id });
              continue;
            } else {
              error = new Error(`Ошибка парсинга: id виджета не число в строке ${li + 1}`);
              break;
            }
          }

          const reconstructed = tokens.map((t) => t.char).join('');
          parsedContent.push({ type: 'text', text: reconstructed });
        }

        const parsedNote: TNote = { ...rest, pinTime, createdAt, content: [] };
        if (error) {
          console.error(error);
        } else {
          parsedNote.content = parsedContent;
          result[id] = parsedNote;
        }
      }
    }
    return result;
  }

  static serialize(notes: TNoteStorage): string {
    const result: TNoteStorageSerialized = {};

    for (const id in notes) {
      const note = notes[id];
      if (note) {
        const contentLines: string[] = note.content.map((item) => {
          if (item.type === 'widget') {
            return `<${item.id}>`;
          } else {
            return item.text.replace(/\\/g, '\\\\').replace(/</g, '\\<').replace(/>/g, '\\>');
          }
        });
        const contentSerialized = contentLines.join('\n');

        result[id] = {
          ...note,
          content: contentSerialized,
          createdAt: note.createdAt.toISOString(),
          pinTime: note.pinTime ? note.pinTime.toISOString() : null,
        };
      }
    }

    return JSON.stringify(result);
  }
}
