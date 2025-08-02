import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import MainPage from "./pages/MainPage";
import NotesPage from "./models/notes/NotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./models/notes/NotePage";
import { NotesProvider } from "./models/notes/NotesProvider";
import NoteEditPage from "./models/notes/NoteEditPage";
import CreateNotePage from "./models/notes/CreateNotePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<MainPage />} />
            <Route path="notes/create-note" element={<CreateNotePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="notes/:id" element={<NotePage />} />
            <Route path="notes/:id/edit" element={<NoteEditPage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
