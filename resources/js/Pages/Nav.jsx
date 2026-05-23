import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";
import { useState } from "react";

export const Nav = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const isAdmin = user?.status === 3;

  const closeMenu = () => setShow(false);

  const navItems = [
    { to: "/", label: "Accueil", icon: "🏠" },
    { to: "/dashboad", label: "Dashboard", icon: "📊" },
    { to: "/spent", label: "Dépenses", icon: "💸" },
    { to: "/investment_tracking", label: "Investment", icon: "💸" },
    { to: "/saving_tracking", label: "Saving", icon: "💸" },
    { to: "/note", label: "Notes", icon: "📝" },
    { to: "/filter", label: "Filtrer", icon: "🔎" },
    { to: "/profile", label: "Profil", icon: "👤" },
  ];

  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 rounded-3 mb-2 px-3 py-2 ${
      isActive
        ? "active bg-primary text-white shadow-sm"
        : "bg-transparent text-dark"
    }`;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
        <div className="container">
          <button
            className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 42, height: 42 }}
            onClick={() => setShow(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link className="navbar-brand fw-bold ms-3" to="/">
            Ambroise<span className="text-primary">App</span>
          </Link>

          <div className="ms-auto d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: 38, height: 38 }}
                >
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="d-none d-md-inline fw-medium text-dark">
                  {user.name}
                </span>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>

      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.45, zIndex: 1040 }}
          onClick={closeMenu}
        />
      )}

      <aside
        className="position-fixed top-0 start-0 bg-white shadow-lg h-100"
        style={{
          width: 300,
          zIndex: 1050,
          transform: show ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0 fw-bold">Menu</h5>
            <small className="text-muted">Navigation principale</small>
          </div>
          <button
            className="btn-close"
            onClick={closeMenu}
            aria-label="Close menu"
          />
        </div>

        <div className="p-3">
          <div className="list-group list-group-flush">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={linkClass}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}

            {isAdmin && (
              <NavLink
                to="/user"
                onClick={closeMenu}
                className={linkClass}
              >
                <span>⚙️</span>
                <span>Gestion utilisateurs</span>
              </NavLink>
            )}
          </div>

          <hr className="my-4" />

          <div className="d-grid gap-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="btn btn-dark"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="btn btn-outline-dark"
                >
                  Connexion
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="btn btn-primary"
                >
                  Inscription
                </NavLink>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};