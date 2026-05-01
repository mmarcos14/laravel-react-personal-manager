import { useState } from "react";
import { createOne } from "../Services/apiService";

export const Contact = () => {
  // état du formulaire contact
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // état loading pendant envoi API
  const [loading, setLoading] = useState(false);

  // message succès UI
  const [success, setSuccess] = useState("");

  // message erreur UI
  const [error, setError] = useState("");

  // gestion inputs
  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // envoi message contact
  const sendMessage = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // appel API backend
      await createOne("contact/message", form);

      // message succès
      setSuccess("Message envoyé avec succès");

      // reset formulaire
      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (e) {
      console.error(e);

      // message erreur générique
      setError("Erreur lors de l'envoi");

    } finally {
      // stop loading dans tous les cas
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6 shadow p-4 rounded bg-light">

          {/* TITRE */}
          <h3 className="text-center mb-4">Contact Me</h3>

          {/* ALERT SUCCESS */}
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          {/* ALERT ERROR */}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={sendMessage}>

            {/* NAME */}
            <div className="mb-3">
              <label>Nom</label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleInput}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleInput}
                required
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-3">
              <label>Message</label>

              <textarea
                name="message"
                className="form-control"
                rows="4"
                value={form.message}
                onChange={handleInput}
                required
              />
            </div>

            {/* BUTTON SUBMIT */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};