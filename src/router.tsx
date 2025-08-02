import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import MainPage from "./pages/MainPage";
import NotesPage from "./pages/NotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./pages/NotePage";
import { NotesProvider } from "./models/notes/NotesProvider";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<MainPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="notes/:id" element={<NotePage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
