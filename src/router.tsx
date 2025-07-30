import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import MainPage from "./pages/MainPage";
import NotesPage from "./pages/NotesPage";

//useParams внутри для получения параметров урл (айди)
const NotePage = () => <h1>Note page</h1>; // скоро добавится
const NotFoundPage = () => <h1>404 - Page Not Found</h1>; // скоро добавится

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="notes/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
