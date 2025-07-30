import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import "./reset.css";
import AppRouter from "./router.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
