import { useMemo, useState } from "react";
import { ModalNote } from "./ModalNote";
import { toast } from "react-toastify";
import { deleteOne } from "../Services/apiService";

export const DataTableNote = ({ DataNote = [], refresh }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState(null);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const safeData = Array.isArray(DataNote) ? DataNote : [];

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return safeData.filter((note) => {
      const title = String(note.title || "").toLowerCase();
      const messages = String(note.messages || "").toLowerCase();
      return title.includes(query) || messages.includes(query);
    });
  }, [safeData, search]);

  const itemPerPage = 4;
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const records = filteredNotes.slice(firstIndex, lastIndex);
  const pages = Math.max(1, Math.ceil(filteredNotes.length / itemPerPage));

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const toastId = toast.loading("Deleting...");
    setLoading(true);

    try {
      await deleteOne("notes", id);
      toast.update(toastId, {
        render: "Deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      refresh?.();
    } catch (e) {
      toast.update(toastId, {
        render: "Delete failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshList = () => {
    setModalOpen(false);
    setModalNote(null);
  };

  const openCreateModal = () => {
    setModalNote(null);
    setModalOpen(true);
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                  <div>
                    <span className="badge bg-dark px-3 py-2 mb-2">
                      Notes Manager
                    </span>
                    <h2 className="fw-bold mb-1">My Notes</h2>
                    <p className="text-muted mb-0">
                      Create, search, edit, and organize your notes easily.
                    </p>
                  </div>

                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={openCreateModal}
                  >
                    + Add Note
                  </button>
                </div>

                <div className="row g-3 align-items-center mb-4">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search notes..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <div className="col-md-4 text-md-end">
                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                      {filteredNotes.length} result(s)
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {records.length ? (
                    records.map((note) => {
                      const isOpen = openNoteId === note.id;
                      const title = note.title || "Untitled";
                      const message = note.messages || "";
                      const shortTitle =
                        title.length > 30 ? title.slice(0, 30) + "..." : title;
                      const shortMessage =
                        message.length > 130 ? message.slice(0, 130) + "..." : message;

                      return (
                        <div key={note.id} className="card border-0 shadow-sm rounded-4">
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start gap-3">
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                  <span className="badge bg-secondary-subtle text-secondary">
                                    Note #{note.id}
                                  </span>
                                  <small className="text-muted">
                                    {note.date_event || "Today"}
                                  </small>
                                </div>

                                <h5 className="fw-bold mb-2">
                                  {isOpen ? title : shortTitle}
                                </h5>

                                <p className="text-muted mb-2">
                                  {isOpen ? message : shortMessage}
                                </p>

                                {message.length > 130 && (
                                  <button
                                    className="btn btn-link p-0 text-decoration-none"
                                    onClick={() =>
                                      setOpenNoteId(isOpen ? null : note.id)
                                    }
                                  >
                                    {isOpen ? "Show less" : "Read more"}
                                  </button>
                                )}
                              </div>

                              <div className="d-flex flex-column gap-2">
                                <button
                                  className="btn btn-outline-success btn-sm px-3"
                                  onClick={() => {
                                    setModalNote(note);
                                    setModalOpen(true);
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-outline-danger btn-sm px-3"
                                  onClick={() => deleteNote(note.id)}
                                  disabled={loading}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-5 bg-white rounded-4 border">
                      <h5 className="fw-bold mb-2">No notes found</h5>
                      <p className="text-muted mb-3">
                        Try another search or add your first note.
                      </p>
                      <button className="btn btn-primary" onClick={openCreateModal}>
                        Add Note
                      </button>
                    </div>
                  )}
                </div>

                {modalOpen && (
                  <ModalNote
                    showm={modalOpen}
                    HideModal={refreshList}
                    CurrentNote={modalNote}
                    Listrefresh={refresh}
                  />
                )}

                {pages > 1 && (
                  <nav className="d-flex justify-content-center mt-4" aria-label="Notes pagination">
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        >
                          Prev
                        </button>
                      </li>

                      {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, pages))
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};