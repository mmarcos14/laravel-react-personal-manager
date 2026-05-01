import { useState } from "react";
import { UpdateModalUser } from "./UpdateModalUser";

// 📌 Composant qui affiche la liste des utilisateurs
export const DataTableUser = ({ DataUser = [], refreshlist }) => {

  //  Sécurise les données pour éviter les erreurs si ce n’est pas un tableau
  const safeData = Array.isArray(DataUser) ? DataUser : [];

  //  Gestion du modal d’édition
  const [showupdateModal, setShowUpdateModal] = useState(false);

  //  Utilisateur sélectionné pour modification
  const [selectedUser, setSelectedUser] = useState(null);

  //  Fonction pour transformer le status en rôle lisible
  const getRole = (status) => {
    switch (status) {
      case 1:
        return { label: "User", className: "badge bg-primary" };
      case 2:
        return { label: "Manager", className: "badge bg-info text-dark" };
      case 3:
        return { label: "Admin", className: "badge bg-success" };
      case 0:
        return { label: "Disabled", className: "badge bg-danger" };
      default:
        return { label: "Unknown", className: "badge bg-secondary" };
    }
  };

  //  Ouvrir le modal avec les infos de l’utilisateur sélectionné
  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(135deg, #f8fbff 0%, #eef2ff 50%, #ffffff 100%)",
      }}
    >
      <div className="container">

        {/* 📌 HEADER */}
        <div className="mb-4">
          <h3 className="fw-bold text-dark">User Management</h3>
          <p className="text-muted mb-0">
            Manage your application users easily
          </p>
        </div>

        {/* 📌 TABLE CARD */}
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-4">

            {/* 📌 TABLE */}
            <div className="table-responsive">
              <table className="table table-hover align-middle">

                {/* TABLE HEADER */}
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {safeData.length > 0 ? (
                    safeData.map((item, index) => {

                      // 🔹 récupération du rôle de l'utilisateur
                      const role = getRole(item.status);

                      return (
                        <tr key={item.id}>
                          <td className="fw-semibold">{index + 1}</td>

                          {/* Nom utilisateur */}
                          <td>
                            <div className="fw-bold">{item.name}</div>
                          </td>

                          {/* Email */}
                          <td className="text-muted">{item.email}</td>

                          {/* Status */}
                          <td>
                            <span className={role.className}>
                              {role.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="text-end">

                            <div className="dropdown">

                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                Actions
                              </button>

                              <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                  <button
                                    className="dropdown-item"
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
                    // 🔹 Si aucun utilisateur
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

          </div>
        </div>

        {/* 📌 MODAL EDIT USER */}
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