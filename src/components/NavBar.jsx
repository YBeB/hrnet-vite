
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
    
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/hrnet-vite/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Current Employees
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hrnet-vite/create"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Create Employee
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
