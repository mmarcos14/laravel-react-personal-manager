import { useMemo, useState } from "react";
import { ModalSpent } from "./ModalSpent";
import { ModalSpent2 } from "./ModalSpent2";
import { useAuth } from "../ServiceContext/AuthContext";
import { deleteOne } from "../Services/apiService";
import { toast } from "react-toastify";

export const DataTableSpent = ({ DataSpent = [], listfresho }) => {
  const { myRest } = useAuth();

  const [showModal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [CurrentT, setCurrentT] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const safeData = Array.isArray(DataSpent) ? DataSpent : [];
  const query = search.trim().toLowerCase();

  const filteredData = useMemo(() => {
    return safeData.filter((item) =>
      [
        item.amount,
        item.type,
        item.destination,
        item.operation_date,
        item.transaction_method,
      ].some((field) =>
        field?.toString().toLowerCase().includes(query)
      )
    );
  }, [safeData, query]);

  const deposits = useMemo(
    () => filteredData.filter((item) => item.type === "Income"),
    [filteredData]
  );

  const withdraw = useMemo(
    () =>
      filteredData.filter(
        (item) =>
          item.type === "Spent" ||
          item.type === "Transport" ||
          item.type === "Food"
      ),
    [filteredData]
  );

  const saving = useMemo(
    () => filteredData.filter((item) => item.type === "Saving"),
    [filteredData]
  );

  const totaldeposits = useMemo(
    () => deposits.reduce((n, item) => n + Number(item.amount), 0),
    [deposits]
  );

  const totalwidraw = useMemo(
    () => withdraw.reduce((t, item) => t + Number(item.amount), 0),
    [withdraw]
  );

  const totalSaving = useMemo(
    () => saving.reduce((n, item) => n + Number(item.amount), 0),
    [saving]
  );

  const rest = myRest(totaldeposits, totalwidraw);
  const formatDate = (d) => new Date(d).toLocaleDateString("fr-FR");

  const EditTransaction = (data) => {
    setCurrentT(data);
    setEditModal(true);
  };

  const deleteSpent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    const toastId = toast.loading("Deleting...");
    try {
      await deleteOne("spent", id);
      toast.update(toastId, {
        render: "Deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      listfresho?.();
    } catch (e) {
      toast.update(toastId, {
        render: "Delete failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getBadge = (type) => {
    if (type === "Income") return "bg-success";
    if (type === "Saving") return "bg-primary";
    if (type === "Food") return "bg-warning text-dark";
    if (type === "Transport") return "bg-info text-dark";
    return "bg-danger";
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
              <h3 className="fw-bold mb-1">Transactions</h3>
              <p className="text-muted mb-0">
                Search, manage, and track your financial records.
              </p>
            </div>

            <button className="btn btn-primary px-4" onClick={() => setModal(true)}>
              + Add Transaction
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-md-8 d-flex justify-content-md-end gap-2 flex-wrap">
              <span className="badge bg-success-subtle text-success px-3 py-2">
                Income: ${totaldeposits.toFixed(2)}
              </span>
              <span className="badge bg-danger-subtle text-danger px-3 py-2">
                Spent: ${Math.abs(totalwidraw).toFixed(2)}
              </span>
              <span className="badge bg-primary-subtle text-primary px-3 py-2">
                Saving: ${totalSaving.toFixed(2)}
              </span>
              <span className={`badge ${rest >= 0 ? "bg-dark" : "bg-danger"} px-3 py-2`}>
                Balance: ${rest.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-header bg-white border-0 pt-4 px-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 text-success">Deposits</h5>
                    <span className="text-muted small">
                      Total: ${totaldeposits.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="card-body px-4 pb-4 table-responsive">
                  <table className="table align-middle table-hover">
                    <thead>
                      <tr className="text-muted small">
                        <th>#</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.filter((item) => item.type === "Income").length > 0 ? (
                        currentData
                          .filter((item) => item.type === "Income")
                          .map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td className="fw-bold text-success">
                                ${Number(item.amount).toFixed(2)}
                              </td>
                              <td>
                                <span className={`badge ${getBadge(item.type)}`}>
                                  {item.type}
                                </span>
                              </td>
                              <td>{formatDate(item.operation_date)}</td>
                              <td className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => EditTransaction(item)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteSpent(item.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">
                            No deposits found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-header bg-white border-0 pt-4 px-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 text-danger">Withdraws</h5>
                    <span className="text-muted small">
                      Total: ${Math.abs(totalwidraw).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="card-body px-4 pb-4 table-responsive">
                  <table className="table align-middle table-hover">
                    <thead>
                      <tr className="text-muted small">
                        <th>#</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.filter((item) =>
                        item.type === "Spent" ||
                        item.type === "Transport" ||
                        item.type === "Food"
                      ).length > 0 ? (
                        currentData
                          .filter(
                            (item) =>
                              item.type === "Spent" ||
                              item.type === "Transport" ||
                              item.type === "Food"
                          )
                          .map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td className="fw-bold text-danger">
                                ${Math.abs(Number(item.amount)).toFixed(2)}
                              </td>
                              <td>
                                <span className={`badge ${getBadge(item.type)}`}>
                                  {item.type}
                                </span>
                              </td>
                              <td>{formatDate(item.operation_date)}</td>
                              <td className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => EditTransaction(item)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteSpent(item.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">
                            No withdraws found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">{currentPage}</span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalSpent2
          showm={showModal}
          listFresh={listfresho}
          HideModal={() => setModal(false)}
        />
      )}

      {editModal && (
        <ModalSpent
          showm={editModal}
          listFresh={listfresho}
          HideModal={() => setEditModal(false)}
          CurrentSpent={CurrentT}
        />
      )}
    </div>
  );
};