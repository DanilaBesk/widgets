import { useNotes } from "./useNotes";
import { NoteList } from "./NoteList";
import type { TNote } from "./types";
import { useRef, forwardRef, useImperativeHandle } from "react";

export type TNoteListsSectionHandle = {
  scrollToPinned: () => void;
  scrollToCommon: () => void;
};

const NoteListsSection = forwardRef<TNoteListsSectionHandle>((_, ref) => {
  const { notes } = useNotes();

  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const commonSectionRef = useRef<HTMLDivElement>(null);

  const scrollToPinned = () => {
    pinnedSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCommon = () => {
    commonSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({
    scrollToPinned,
    scrollToCommon,
  }));

  const commonNotes: TNote[] = Object.values(notes)
    .filter((note): note is TNote => !!note && note.isPinned === false)
    .sort((a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0));

  const pinnedNotes: TNote[] = Object.values(notes)
    .filter((note): note is TNote => !!note && note.isPinned === true)
    .sort((a, b) => (b.pinTime?.getTime() ?? 0) - (a.pinTime?.getTime() ?? 0));

  return (
    <div id="all">
      <div ref={pinnedSectionRef}>
        <NoteList filteredNotes={pinnedNotes} />
      </div>
      <br />
      <div ref={commonSectionRef}>
        <NoteList filteredNotes={commonNotes} />
      </div>
    </div>
  );
});

export default NoteListsSection;
