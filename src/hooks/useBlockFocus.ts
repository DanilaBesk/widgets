import { useEffect, useRef, useState } from 'react';
import type { FocusState } from '../components/notes/lib/textBlockHanldes';
import type { TNote } from '../store/data/types';
import { getFirstTextBlock } from '../components/notes/lib/textBlockOperations';

export function useBlockFocus(
  note: TNote,
  blockRefs: React.RefObject<(HTMLTextAreaElement | null)[]>,
) {
  const [focus, setFocus] = useState<FocusState | null>(null);
  const firstFocusRef = useRef(true);

  useEffect(() => {
    if (focus === null) return;
    let cancelled = false;

    const tryFocus = () => {
      if (cancelled) return;
      const el = blockRefs.current[focus.blockIndex];
      if (el) {
        try {
          el.focus({ preventScroll: true });
          el.setSelectionRange(focus.offset, focus.offset);
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (err) {
          console.warn('Произошла неизвестная ошибка', err);
        }
        if (!cancelled) setFocus(null);
      } else {
        // элемент ещё не появился в DOM — ждём следующего фрейма
        requestAnimationFrame(tryFocus);
      }
    };
    tryFocus();
    return () => {
      cancelled = true;
    };
  }, [focus, note.content.length, blockRefs, setFocus]);

  useEffect(() => {
    if (!firstFocusRef.current) return;

    const target = getFirstTextBlock(note.content);
    if (target) {
      const el = blockRefs.current[target.index];
      if (el) {
        el.focus({ preventScroll: true });
        const offset = target.block.text.length;
        el.setSelectionRange(offset, offset);
      }
    }
    firstFocusRef.current = false;
  }, [note, blockRefs]);

  return setFocus;
}
