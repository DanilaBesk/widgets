import { createContext } from "react";
import type { TNotesContext } from "./types";

export const NotesContext = createContext<TNotesContext | null>(null);
