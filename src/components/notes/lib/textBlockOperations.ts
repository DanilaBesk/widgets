import type { TNoteContent } from '../../../store/data/types';

const WORD_REGEX = /\p{L}|\p{N}|_/u;

export const getNextBoundary = (text: string, pos: number): number => {
  if (pos >= text.length) return text.length;

  let i = pos;
  while (i < text.length && /\s/.test(text[i])) i++;
  if (i >= text.length) return text.length;

  if (WORD_REGEX.test(text[i])) {
    while (i < text.length && WORD_REGEX.test(text[i])) i++;
    return i;
  }

  return i + 1;
};

export const getPrevBoundary = (text: string, pos: number): number => {
  if (pos <= 0) return 0;

  let i = pos - 1;

  while (i >= 0 && /\s/.test(text[i])) i--;
  if (i < 0) return 0;

  if (WORD_REGEX.test(text[i])) {
    while (i >= 0 && WORD_REGEX.test(text[i])) i--;
    return i + 1;
  }

  return i;
};

export const getNextTextBlock = (
  content: TNoteContent[],
  currentIndex: number,
  cycle?: boolean,
) => {
  if (currentIndex >= 0) {
    for (let i = currentIndex + 1; i < content.length; i++) {
      const target = content[i];
      if (target.type === 'text') {
        return { block: target, index: i };
      }
    }
    if (cycle) {
      for (let i = 0; i <= currentIndex; i++) {
        const target = content[i];
        if (target.type === 'text') {
          return { block: target, index: i };
        }
      }
    }
  }
  return null;
};

export const getFirstTextBlock = (content: TNoteContent[]) => {
  return getNextTextBlock(content, content.length - 1, true);
};

export const getPrevTextBlock = (
  content: TNoteContent[],
  currentIndex: number,
  cycle?: boolean,
) => {
  if (currentIndex - 1 < content.length) {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const target = content[i];
      if (target.type === 'text') {
        return { block: target, index: i };
      }
    }
    if (cycle) {
      for (let i = content.length - 1; i >= currentIndex; i--) {
        const target = content[i];
        if (target.type === 'text') {
          return { block: target, index: i };
        }
      }
    }
  }
  return null;
};
