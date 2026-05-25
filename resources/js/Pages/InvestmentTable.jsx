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

  const Item_Per_Page = 8;
  const query = search.trim().toLowerCase();

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

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

  const nPage = Math.ceil(FilterInvestment.length / Item_Per_Page);
  const lastIndex = CurrentPage * Item_Per_Page;
  const firstIndex = lastIndex - Item_Per_Page;
  const Records = FilterInvestment.slice(firstIndex, lastIndex);

  const goToPage = (page) => {
    if (page < 1 || page > nPage) return;
    setCurrentPage(page);
  };

  const total = useMemo(() => {
    return investments
      .reduce((sum, item) => sum + Number(item.amount || 0), 0)
      .toFixed(2);
  }, [investments]);

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

  const Pagination = () => {
    if (nPage <= 1) return null;

    return (
      <nav className="mt-4 d-flex justify-content-center">
        <ul className="pagination flex-wrap shadow-sm">
          <li className={`page-item ${CurrentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(CurrentPage - 1)}>
              Previous
            </button>
          </li>

          {Array.from({ length: nPage }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${CurrentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => goToPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${CurrentPage === nPage ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(CurrentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container py-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm rounded-3"
          placeholder="Search investment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div
          className="card-header text-white p-4 border-0"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
          }}
        >
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div>
              <h4 className="mb-1 fw-bold">Investment History</h4>
              <small className="text-white-50">
                Manage and track all your investments
              </small>
            </div>

            <div className="d-flex flex-row flex-wrap gap-2 align-items-center">
              <span className="badge bg-success px-3 py-2 fs-6 shadow-sm">
                Total: ${total}
              </span>
              <span className="badge bg-primary px-3 py-2 shadow-sm">
                Completed: {stats.completed}
              </span>
              <span className="badge bg-warning text-dark px-3 py-2 shadow-sm">
                Pending: {stats.pending}
              </span>
              <button
                className="btn btn-light btn-sm px-3 shadow-sm"
                onClick={() => openModal()}
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="p-5 text-center">
              <div className="spinner-border text-primary" />
              <p className="mt-2 text-muted">Loading...</p>
            </div>
          ) : Records.length === 0 ? (
            <div className="p-5 text-center text-muted">
              No investment found
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Date</th>
                    <th>Destination</th>
                    <th className="d-none d-md-table-cell">Method</th>
                    <th>Status</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {Records.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4">{item.operation_date}</td>

                      <td>
                        <div className="fw-semibold">{item.destination}</div>
                        <small className="text-muted d-md-none">
                          {item.transaction_method}
                        </small>
                      </td>

                      <td className="d-none d-md-table-cell">
                        {item.transaction_method}
                      </td>

                      <td>
                        {Number(item.status) === 1 ? (
                          <span className="badge bg-success px-3 py-2">
                            Completed
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark px-3 py-2">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="text-end fw-bold">
                        ${Number(item.amount || 0).toFixed(2)}
                      </td>

                      <td className="text-end pe-4">
                        <div className="d-flex flex-row flex-nowrap justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-success"
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination />
        </div>
      </div>

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