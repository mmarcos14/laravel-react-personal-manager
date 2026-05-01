import axios from "axios";

// Vérifie si l'application tourne en local ou en production
const isLocal =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";

// Définition de la base URL selon l’environnement
const BASE_URL = isLocal
  ? "http://127.0.0.1:8000"
  : "https://ambroiseapp.com";

// Instance Axios configurée pour toute l’application
const api = axios.create({
  baseURL: `${BASE_URL}/api`, // base API Laravel
  withCredentials: true, // nécessaire pour Sanctum (cookies/session)
  headers: {
    "X-Requested-With": "XMLHttpRequest", // requis par Laravel
    Accept: "application/json", // réponse attendue en JSON
  },
});

// Récupère le cookie CSRF (obligatoire pour les requêtes protégées Laravel Sanctum)
export const getCsrfCookie = async () => {
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

// Récupérer toutes les données d’un endpoint
export const fetchAll = (endpoint) =>
  api.get(`/${endpoint}/index`);

// Créer une nouvelle donnée
export const createOne = async (endpoint, data) => {
  await getCsrfCookie();
  return api.post(`/${endpoint}/store`, data);
};

// Fonction de filtrage (attention : même endpoint que store ici)
export const Filters = async (endpoint, data) => {
  await getCsrfCookie();
  return api.post(`/${endpoint}/store`, data);
};

// Mettre à jour une donnée
export const updateOne = async (endpoint, data) => {
  await getCsrfCookie();
  return api.post(`/${endpoint}/update`, data);
};

// Supprimer une donnée par ID
export const deleteOne = (endpoint, id) =>
  api.delete(`/${endpoint}/delete/${id}`);

// Export de l’instance axios pour usage global
export default api;