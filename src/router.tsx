import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotePage from "./models/notes/NotePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<MainPage />} />
          <Route path="notes/:id" element={<NotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
