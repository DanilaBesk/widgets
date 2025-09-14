import { useCallback, useRef } from 'react';
import Title from '../../common/Title';
import Widget from '../../widgets/Widget';
import styles from './index.module.css';
import { formatDate } from '../lib/formatDate';
import { Flex } from '../../common/Flex';
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

const NoteContent = () => {
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
    <Flex direction="column" className={styles.note}>
      <Title level={1}>{note.title}</Title>
      <div className={styles.createdAt}>{formatDate(note.createdAt)}</div>
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

export default NoteContent;
