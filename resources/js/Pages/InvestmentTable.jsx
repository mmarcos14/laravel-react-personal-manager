import { useEffect, useMemo, useState } from "react";
import { deleteOne } from "../Services/apiService";
import { ModalInvestment } from "./ModalInvestmentSaving";
import { toast } from "react-toastify";

export const InvestmentTable = ({ DataInvestment = [], refresh, loading }) => {

  const investments = Array.isArray(DataInvestment)
    ? DataInvestment.filter((item) => item.type === "Investment")
    : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentInvestment, setCurrentInvestment] = useState(null);

  const [search, setSearch] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);

  const Item_Per_Page =8;

  const query = search.trim().toLowerCase();

  // RESET PAGE WHEN SEARCH CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // FILTER
  const FilterInvestment = useMemo(() => {
    return investments.filter((p) =>
      [
        p.amount,
        p.type,
        p.transaction_method,
        p.operation_date,
        p.destination,
      ].some((field) =>
        field?.toString().toLowerCase().includes(query)
      )
    );
  }, [investments, query]);

  // PAGINATION LOGIC
  const nPage = Math.ceil(FilterInvestment.length / Item_Per_Page);

  const lastIndex = CurrentPage * Item_Per_Page;
  const firstIndex = lastIndex - Item_Per_Page;

  const Records = FilterInvestment.slice(firstIndex, lastIndex);

  const goToPage = (page) => {
    if (page < 1 || page > nPage) return;
    setCurrentPage(page);
  };

  // TOTAL
  const total = useMemo(() => {
    return investments
      .reduce((sum, item) => sum + Number(item.amount || 0), 0)
      .toFixed(2);
  }, [investments]);

  // STATS
  const stats = useMemo(() => {
    const completed = investments.filter((item) => Number(item.status) === 1).length;
    const pending = investments.filter((item) => Number(item.status) !== 1).length;
    return { completed, pending };
  }, [investments]);

  const openModal = (item = null) => {
    setCurrentInvestment(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentInvestment(null);
  };

  const deleteInvestment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this investment?")) return;

    const toastId = toast.loading("Deleting...");

    try {
      await deleteOne("spent", id);

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
    }
  };

  // PAGINATION COMPONENT
  const Pagination = () => {
    return (
      <nav className="mt-4 d-flex justify-content-center">
        <ul className="pagination">

          {/* Previous */}
          <li className={`page-item ${CurrentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(CurrentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Pages */}
          {Array.from({ length: nPage }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${CurrentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${CurrentPage === nPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(CurrentPage + 1)}
            >
              Next
            </button>
          </li>

        </ul>
      </nav>
    );
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search investment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card border-0 shadow-lg rounded-2 overflow-hidden">

        {/* HEADER CARD */}
        <div className="card-header bg-dark text-white p-4 border-0">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h4 className="mb-1 fw-bold">Investment History</h4>
              <small className="text-white-50">
                Manage and track all your investments
              </small>
            </div>

            <div className="d-flex gap-2 align-items-center">

              <span className="badge bg-success px-3 py-2 fs-6">
                Total: ${total}
              </span>

              <span className="badge bg-primary px-3 py-2">
                Completed: {stats.completed}
              </span>

              <span className="badge bg-warning text-dark px-3 py-2">
                Pending: {stats.pending}
              </span>

              <button
                className="btn btn-light btn-sm"
                onClick={() => openModal()}
              >
                + Add
              </button>

            </div>

          </div>
        </div>

        {/* BODY */}
        <div className="card-body p-0">

          {loading ? (
            <div className="p-5 text-center">
              <div className="spinner-border text-primary" />
              <p className="mt-2">Loading...</p>
            </div>
          ) : Records.length === 0 ? (
            <div className="p-5 text-center text-muted">
              No investment found
            </div>
          ) : (
            <>
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {Records.map((item) => (
                    <tr key={item.id}>
                      <td>{item.operation_date}</td>
                      <td>{item.destination}</td>
                      <td>{item.transaction_method}</td>

                      <td>
                        {Number(item.status) === 1 ? (
                          <span className="badge bg-success">Completed</span>
                        ) : (
                          <span className="badge bg-warning text-dark">Pending</span>
                        )}
                      </td>

                      <td className="text-end fw-bold">
                        ${Number(item.amount || 0).toFixed(2)}
                      </td>

                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => openModal(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteInvestment(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination />
            </>
          )}

        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <ModalInvestment
          showm={modalOpen}
          CurrentSpent={currentInvestment}
          HideModal={closeModal}
          listFresh={refresh}
        />
      )}

    </div>
  );
};