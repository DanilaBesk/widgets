import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import "./reset.css";
import AppRouter from "./router.tsx";
import { StrictMode } from "react";
import { NotesProvider } from "./models/notes/NotesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesProvider>
      <AppRouter />
    </NotesProvider>
  </StrictMode>
);
