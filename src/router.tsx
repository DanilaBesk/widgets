import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './pages/components/PageLayout';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NotePage } from './pages/NotePage';
import { NoteGuard } from './components/notes/NoteGuard';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="notes/:id"
            element={
              <NoteGuard>
                <NotePage />
              </NoteGuard>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
