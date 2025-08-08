import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import AppRouter from "./router.tsx";
import { StrictMode } from "react";
import { NotesProvider } from "./models/notes/NotesProvider.tsx";
import { Toaster } from "./config/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesProvider>
      <Toaster />
      <AppRouter />
    </NotesProvider>
  </StrictMode>
);
