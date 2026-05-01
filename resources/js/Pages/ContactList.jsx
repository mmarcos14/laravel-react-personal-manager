import { useEffect, useState } from "react";
import { fetchAll, deleteOne } from "../Services/apiService";

export const ContactList = () => {
  // liste des messages contact
  const [messages, setMessages] = useState([]);

  // message sélectionné pour modal "Lire"
  const [selected, setSelected] = useState(null);

  // récupération des messages depuis API
  const getMessages = async () => {
    try {
      const res = await fetchAll("contact/list");

      // stockage des messages
      setMessages(res.data || []);

    } catch (e) {
      console.error("Error loading messages");
    }
  };

  // suppression d'un message
  const deleteMessage = async (id) => {

    // confirmation utilisateur (UX simple mais efficace)
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      // appel API delete
      await deleteOne("contact/delete", id);

      // mise à jour UI sans reload
      setMessages((prev) => prev.filter((m) => m.id !== id));

    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  // chargement initial
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="container py-5">

      <h3>Messages reçus</h3>

      <div className="row">

        {/* LISTE DES MESSAGES */}
        {messages.map((item) => (
          <div className="col-md-4" key={item.id}>

            <div className="card p-3">

              {/* nom utilisateur */}
              <h6>{item.name}</h6>

              {/* email */}
              <small>{item.email}</small>

              {/* message preview */}
              <p>{item.message}</p>

              {/* ouvrir modal */}
              <button onClick={() => setSelected(item)}>
                Lire
              </button>

              {/* delete message */}
              <button onClick={() => deleteMessage(item.id)}>
                Supprimer
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL SIMPLE */}
      {selected && (
        <div className="modal d-block">

          <div className="modal-dialog">

            <div className="modal-content p-3">

              {/* titre message */}
              <h5>{selected.name}</h5>

              {/* contenu message */}
              <p>{selected.message}</p>

              {/* fermer modal */}
              <button onClick={() => setSelected(null)}>
                Fermer
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};