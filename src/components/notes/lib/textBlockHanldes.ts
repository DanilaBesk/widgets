import type { TNoteContent } from '../../../store/data/types';
import type { UnionToMap } from '../../../lib/utility-types';
import {
  getNextBoundary,
  getNextTextBlock,
  getPrevBoundary,
  getPrevTextBlock,
} from './textBlockOperations';
import type { DataContextValue } from '../../../store/data/types';
import type { NoteContextValue } from '../../../store/note/types';

export interface FocusState {
  blockIndex: number;
  offset: number;
}

export const createSelectHandler =
  (cursorPosition: NoteContextValue['cursorPosition'], blockIndex: number) => () => {
    const sel = window.getSelection();
    cursorPosition.current = { position: sel?.anchorOffset ?? 0, blockIndex };
  };

export const createChangeHandler =
  (updateNote: DataContextValue['updateNote'], noteId: number, blockIndex: number) =>
  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(noteId, {
      content: { type: 'replace', blockIndex, text: e.target.value },
    });
  };

export const createKeyDownHandler =
  (
    noteId: number,
    content: TNoteContent[],
    blockIndex: number,
    block: UnionToMap<TNoteContent, 'type'>['text'],
    updateNote: DataContextValue['updateNote'],
    setFocus: React.Dispatch<React.SetStateAction<FocusState | null>>,
  ) =>
  (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const cursorPosition = e.currentTarget.selectionStart;

    if (e.key === 'Enter') {
      e.preventDefault();
      let offset = cursorPosition;
      let targetIndex = blockIndex + 1;
      if (e.metaKey || e.ctrlKey) {
        offset = e.shiftKey ? 0 : block.text.length;
        if (e.shiftKey) targetIndex = blockIndex;
      }
      updateNote(noteId, {
        content: { type: 'split', blockIndex, cursorPosition: offset },
      });
      setFocus({ blockIndex: targetIndex, offset: 0 });
    }

    if (e.key === 'Backspace' && cursorPosition === 0) {
      e.preventDefault();
      const prev = getPrevTextBlock(content, blockIndex);
      if (prev) {
        setFocus({ blockIndex: prev.index, offset: prev.block.text.length });
        updateNote(noteId, { content: { type: 'delete', blockIndex } });
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      let offset = cursorPosition;
      let targetBlockIndex = blockIndex;

      if (e.ctrlKey || e.metaKey || e.altKey) {
        if (e.shiftKey) {
          if (cursorPosition !== 0) {
            offset = getPrevBoundary(block.text, cursorPosition);
          } else {
            const prevTextBlock = getPrevTextBlock(content, blockIndex, true);
            if (prevTextBlock) {
              targetBlockIndex = prevTextBlock.index;
              offset = prevTextBlock.block.text.length;
            }
          }
        } else {
          if (cursorPosition !== block.text.length) {
            offset = getNextBoundary(block.text, cursorPosition);
          } else {
            const nextTextBlock = getNextTextBlock(content, blockIndex, true);
            if (nextTextBlock) {
              targetBlockIndex = nextTextBlock.index;
              offset = 0;
            }
          }
        }
      } else if (e.shiftKey) {
        const prevTextBlock = getPrevTextBlock(content, blockIndex, true);
        if (prevTextBlock) {
          targetBlockIndex = prevTextBlock.index;
          offset = prevTextBlock.block.text.length;
        }
      } else {
        const nextTextBlock = getNextTextBlock(content, blockIndex, true);
        if (nextTextBlock) {
          targetBlockIndex = nextTextBlock.index;
          offset = nextTextBlock.block.text.length;
        }
      }
      setFocus({
        blockIndex: targetBlockIndex,
        offset,
      });
    }
  };
