import { NavLink } from "react-router-dom";

const activeFn = ({ isActive }: { isActive: boolean }) =>
  isActive ? "active navigation-link" : "navigation-link";

export const Navigation = () => {
  return (
    <div className="navigation-container">
      <nav className="navigation">
        <NavLink to="/" className={activeFn}>
          Главная
        </NavLink>
        <NavLink to="/notes" className={activeFn}>
          Заметки
        </NavLink>
      </nav>
    </div>
  );
};
