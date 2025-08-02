import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes должен использоваться внутри <NotesProvider>");
  }
  return context;
}
