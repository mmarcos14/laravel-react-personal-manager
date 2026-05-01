import { useEffect, useState } from "react";
import { DataTableNote } from "./DataTableNote";
import { fetchAll } from "../Services/apiService";

export const ListNotes = () => {
  const [Notes, setNote] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    try {
      const response = await fetchAll("notes");

      // 🔥 FIX IMPORTANT: sécuriser la réponse
      setNote(response.data.nostes || response.data || []);
    } catch (error) {
      console.error("RESPONSE", error);
      setNote([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center py-5"
        style={{ minHeight: "350px" }}
      >
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Chargement...</span>
        </div>
        <h6 className="text-primary fw-bold mb-1">Veuillez patienter</h6>
        <small className="text-muted">Chargement des notes...</small>
      </div>
    );
  }

  return <DataTableNote DataNote={Notes} refresh={getNotes} />;
};