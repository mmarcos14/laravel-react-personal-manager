import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// Création du contexte d’authentification
const AuthContext = createContext();

// Détection de l’environnement (local ou production)
const isLocal =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";

// Définition de la base URL selon l’environnement
const BASE_URL = isLocal
  ? "http://127.0.0.1:8000"
  : "https://ambroiseapp.com";

// Instance Axios configurée pour toute l’application
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important pour Laravel Sanctum (cookies/session)
  headers: {
    "X-Requested-With": "XMLHttpRequest", // requis par Laravel
    Accept: "application/json", // réponse JSON attendue
  },
});

// Provider global d’authentification
export const ProviderContext = ({ children }) => {
  const [user, setUser] = useState(null); // utilisateur connecté
  const [loading, setLoading] = useState(true); // état de chargement
  const [errors, setErrors] = useState({}); // gestion des erreurs

  // Récupération de l’utilisateur connecté
  const getUser = async () => {
    try {
      await api.get("/sanctum/csrf-cookie"); // cookie CSRF Laravel
      const res = await api.get("/api/user"); // requête user
      setUser(res.data.user || null); // stockage user
    } catch (error) {
      console.error("getUser error:", error.response?.data || error.message);
      setUser(null); // si erreur → pas d’utilisateur
    } finally {
      setLoading(false); // fin du chargement
    }
  };

  // Fonction générique pour login, register, etc.
  const operations = async (url, data) => {
    setErrors({}); // reset erreurs

    try {
      await api.get("/sanctum/csrf-cookie"); // sécurité CSRF
      const res = await api.post(`/api${url}`, data); // requête API
      await getUser(); // refresh user après action
      return res.data;
    } catch (e) {
      console.error("Operation error:", e.response?.data);

      // si backend inaccessible
      if (!e.response) {
        setErrors({ general: ["Server not reachable"] });
        return;
      }

      const { status, data } = e.response;

      // erreur de validation Laravel
      if (status === 422) {
        setErrors(data.errors || { general: ["Invalid data"] });
      } else {
        // autre erreur serveur
        setErrors({ general: [data.message || "Something went wrong"] });
      }
    }
  };

  // Récupération des données (ex: dépenses)
  const fetchAll = async (url) => {
    setErrors({});

    try {
      const res = await api.get(`/api${url}`);
      return res.data.spents; // retour des données
    } catch (e) {
      console.error("Fetch error:", e.response?.data);

      if (!e.response) {
        setErrors({ general: ["Server not reachable"] });
        return;
      }

      const { status, data } = e.response;

      if (status === 422) {
        setErrors(data.errors || { general: ["Invalid data"] });
      } else {
        setErrors({ general: [data.message || "Something went wrong"] });
      }
    }
  };

  // Déconnexion utilisateur
  const logout = async () => {
    try {
      await api.post("/api/logout"); // appel logout backend
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setUser(null); // suppression user local
      window.location.href = "/"; // redirection home
    }
  };

  // Chargement automatique de l’utilisateur au montage
  useEffect(() => {
    getUser();
  }, []);

  // Fonction utilitaire (calcul de reste)
  const myRest = (income, spent) => {
    return Number(income) - Number(spent);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        operations,
        errors,
        setErrors,
        logout,
        fetchAll,
        myRest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => useContext(AuthContext);