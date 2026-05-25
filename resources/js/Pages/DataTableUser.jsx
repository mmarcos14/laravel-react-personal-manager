import { useState } from "react";
import { UpdateModalUser } from "./UpdateModalUser";

export const DataTableUser = ({ DataUser = [], refreshlist }) => {
  const safeData = Array.isArray(DataUser) ? DataUser : [];

  const [showupdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getRole = (status) => {
    switch (status) {
      case 1:
        return { label: "User", className: "badge rounded-pill bg-primary px-3 py-2" };
      case 2:
        return { label: "Manager", className: "badge rounded-pill bg-info text-dark px-3 py-2" };
      case 3:
        return { label: "Admin", className: "badge rounded-pill bg-success px-3 py-2" };
      case 0:
        return { label: "Disabled", className: "badge rounded-pill bg-danger px-3 py-2" };
      default:
        return { label: "Unknown", className: "badge rounded-pill bg-secondary px-3 py-2" };
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #f8fbff 0%, #eef2ff 50%, #ffffff 100%)",
      }}
    >
      <div className="container">
        <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">User Management</h3>
            <p className="text-muted mb-0">
              Manage your application users easily
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <span className="badge bg-primary-subtle text-primary border px-3 py-2">
              Total users: {safeData.length}
            </span>
          </div>
        </div>

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div
            className="card-header border-0 text-white px-4 py-3"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1 fw-bold">Users Table</h5>
                <small className="text-white-50">
                  View and manage user accounts
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {safeData.length > 0 ? (
                    safeData.map((item, index) => {
                      const role = getRole(item.status);

                      return (
                        <tr key={item.id}>
                          <td className="ps-4 fw-semibold text-muted">
                            {String(index + 1).padStart(2, "0")}
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                                style={{ width: 42, height: 42 }}
                              >
                                {item.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <div className="fw-bold">{item.name}</div>
                                <small className="text-muted d-md-none">{item.email}</small>
                              </div>
                            </div>
                          </td>

                          <td className="text-muted d-none d-md-table-cell">{item.email}</td>

                          <td>
                            <span className={role.className}>{role.label}</span>
                          </td>

                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle px-3"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Actions
                              </button>

                              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                <li>
                                  <button
                                    className="dropdown-item py-2"
                                    onClick={() => openEditModal(item)}
                                  >
                                    ✏️ Edit user
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        <div className="display-6 mb-2">👥</div>
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showupdateModal && (
          <UpdateModalUser
            CurrentUser={selectedUser}
            show={showupdateModal}
            HideModal={() => setShowUpdateModal(false)}
            refreshlist={refreshlist}
          />
        )}
      </div>
    </div>
  );
};