import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";
import { useState } from "react";

export const Nav = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  const closeMenu = () => setShow(false);
  const isAdmin = user?.status === 3;

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded-3 mb-2 ${
      isActive ? "bg-primary text-white" : "text-white"
    }`;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <button
            className="btn btn-outline-light"
            onClick={() => setShow(true)}
          >
            ☰
          </button>

          <Link className="navbar-brand fw-bold" to="/">
            Ambroise<span className="text-primary">App</span>
          </Link>

          {user ? (
            <span className="text-white small">
              👋 {user.name}
            </span>
          ) : (
            <span className="text-white small">Guest</span>
          )}
        </div>
      </nav>

      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 1040 }}
          onClick={closeMenu}
        />
      )}

      <div
        className="position-fixed top-0 start-0 bg-dark text-white p-4 shadow-lg"
        style={{
          width: "280px",
          height: "100%",
          zIndex: 1050,
          transform: show ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Menu</h5>
          <button className="btn btn-sm btn-outline-light" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <nav className="d-flex flex-column">
          <NavLink to="/" onClick={closeMenu} className={linkClass}>
            🏠 Accueil
          </NavLink>

          <NavLink to="/dashboad" onClick={closeMenu} className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/spent" onClick={closeMenu} className={linkClass}>
            💸 Dépenses
          </NavLink>

          <NavLink to="/note" onClick={closeMenu} className={linkClass}>
            📝 Notes
          </NavLink>

          <NavLink to="/filter" onClick={closeMenu} className={linkClass}>
            🔎 Filter
          </NavLink>

          <NavLink to="/profile" onClick={closeMenu} className={linkClass}>
            👤 Profile
          </NavLink>

          {isAdmin && (
            <NavLink to="/user" onClick={closeMenu} className={linkClass}>
              ⚙️ Gestion Users
            </NavLink>
          )}
        </nav>

        <hr className="my-4 border-light opacity-25" />

        {user ? (
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="btn btn-outline-light w-100"
          >
            Déconnexion
          </button>
        ) : (
          <div className="d-grid gap-2">
            <NavLink to="/login" onClick={closeMenu} className="btn btn-outline-light">
              Connexion
            </NavLink>

            <NavLink to="/register" onClick={closeMenu} className="btn btn-primary">
              Inscription
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};