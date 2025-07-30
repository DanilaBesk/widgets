import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <header className="app-header">
        <h1>Page not found</h1>
        <NavLink to="/" className="navigation-link">
          Вернуться на главную страницу
        </NavLink>
      </header>
    </>
  );
};

export default NotFoundPage;
