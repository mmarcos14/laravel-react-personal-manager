import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";

export const RoutesProtected = ({ children }) => {
  // récupération user + état loading depuis le contexte auth
  const { user, loading } = useAuth();

  // pendant le chargement de l'utilisateur (API /sanctum)
  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{ minHeight: "350px" }}
      >
        {/* spinner de chargement */}
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Chargement...</span>
        </div>

        {/* message utilisateur */}
        <h6 className="text-primary fw-bold mb-1">
          Veuillez patienter
        </h6>

        <small className="text-muted">
          Chargement en cours...
        </small>
      </div>
    );
  }

  // si l'utilisateur n'est pas connecté → redirection login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // si connecté → accès aux routes protégées
  return children || <Outlet />;
};