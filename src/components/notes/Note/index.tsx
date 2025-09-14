import { useCallback, useRef } from 'react';
import Widget from '../../widgets/Widget';
import styles from './index.module.css';
import { NoteTextBlock } from '../NoteTextBlock';
import { useData } from '../../../hooks/useData';
import {
  createChangeHandler,
  createKeyDownHandler,
  createSelectHandler,
} from '../lib/textBlockHanldes';
import { useBlockFocus } from '../../../hooks/useBlockFocus';
import { useNote } from '../../../hooks/useNote';
import { getBlockId } from '../lib/getBlockId';
import { NoteTitle } from '../NoteTitle';
import { Flex } from '../../common/Flex';
import { NoteCreatedAt } from '../NoteCreatedAt';

export const Note = () => {
  const { note, cursorPosition } = useNote();
  const updateNote = useData((ctx) => ctx.updateNote);

  const blockRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const setFocus = useBlockFocus(note, blockRefs);

  const setBlockRef = useCallback(
    (index: number) => (el: HTMLTextAreaElement | null) => {
      blockRefs.current[index] = el;
    },
    [],
  );

  return (
    <Flex direction="column" className={styles.container}>
      <NoteTitle />
      <NoteCreatedAt />
      <div>
        {note.content.map((block, index) =>
          block.type === 'text' ? (
            <NoteTextBlock
              id={getBlockId(note.id, index)}
              key={getBlockId(note.id, index)}
              ref={setBlockRef(index)} // инициализация ref внутри
              value={block.text}
              onSelect={createSelectHandler(cursorPosition, index)}
              onKeyDown={createKeyDownHandler(
                note.id,
                note.content,
                index,
                block,
                updateNote,
                setFocus,
              )}
              onChange={createChangeHandler(updateNote, note.id, index)}
            />
          ) : (
            <Widget key={getBlockId(note.id, index)} widgetId={block.id} />
          ),
        )}
      </div>
    </Flex>
  );
};
