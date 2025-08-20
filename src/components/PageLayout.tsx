import { Outlet } from 'react-router-dom';

export const PageLayout = () => {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
};
