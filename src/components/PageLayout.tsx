import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";


export const PageLayout = () => {
  return (
    <div className="app-container">
      <Navigation />
      <Outlet />
    </div>
  );
};
