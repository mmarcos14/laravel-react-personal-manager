import { useState } from "react";
import { useAuth } from "../ServiceContext/AuthContext";
import { Link } from "react-router-dom";
import { ModalSpent2 } from "./ModalSpent2";

export const Dashboad = () => {
  const { user } = useAuth();
  const [showm, setModal] = useState(false);

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR")
    : "N/A";

  const noteCount = user?.notes?.length || 0;

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4 py-md-5">
        <div className="row align-items-center mb-4 g-3">
          <div className="col-md-8">
            <span className="badge bg-dark px-3 py-2 mb-2">
              Personal Finance Dashboard
            </span>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-0">
              Welcome back, {user?.name || "User"} 👋
            </p>
          </div>

          <div className="col-md-4 text-md-end">
            <div className="small text-muted">Member since</div>
            <div className="fw-semibold">{joinDate}</div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="text-muted small mb-1">Notes</div>
                <div className="fs-2 fw-bold text-primary">{noteCount}</div>
                <div className="text-muted small">Created notes</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="text-muted small mb-1">Email</div>
                <div className="fw-semibold text-truncate">{user?.email || "N/A"}</div>
                <div className="text-muted small">Account contact</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="text-muted small mb-1">Status</div>
                <div className="fw-bold text-success">Active</div>
                <div className="text-muted small">Authenticated user</div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="text-muted small mb-1">Profile</div>
                <div className="fw-bold text-dark">Updated</div>
                <div className="text-muted small">Accessible dashboard</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h5 className="fw-bold mb-1">Quick Actions</h5>
                <p className="text-muted mb-0">
                  Manage your transactions, notes, and profile from one place.
                </p>
              </div>
              <button
                className="btn btn-primary px-4"
                onClick={() => setModal(true)}
              >
                ➕ Add Transaction
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-6 col-lg-3">
                <Link to="/spent" className="text-decoration-none">
                  <div className="card h-100 border-0 bg-success-subtle rounded-4 p-3 hover-shadow">
                    <div className="fw-bold text-success">💰 Transactions</div>
                    <div className="text-muted small">
                      View and track all operations
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6 col-lg-3">
                <Link to="/filter" className="text-decoration-none">
                  <div className="card h-100 border-0 bg-dark-subtle rounded-4 p-3 hover-shadow">
                    <div className="fw-bold text-dark">🔎 Filter Data</div>
                    <div className="text-muted small">
                      Search and analyze your records
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6 col-lg-3">
                <Link to="/note" className="text-decoration-none">
                  <div className="card h-100 border-0 bg-primary-subtle rounded-4 p-3 hover-shadow">
                    <div className="fw-bold text-primary">📝 Notes</div>
                    <div className="text-muted small">
                      Organize your personal notes
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6 col-lg-3">
                <Link to="/profile" className="text-decoration-none">
                  <div className="card h-100 border-0 bg-secondary-subtle rounded-4 p-3 hover-shadow">
                    <div className="fw-bold text-secondary">👤 Profile</div>
                    <div className="text-muted small">
                      Update your account details
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 p-md-5">
                <h5 className="fw-bold mb-3">Recent Activity</h5>
                <div className="text-muted">
                  Your latest transactions, notes, and updates will appear here.
                </div>
                <div className="mt-4 p-4 bg-light rounded-4 border">
                  <div className="fw-semibold mb-1">No activity yet</div>
                  <div className="text-muted small">
                    Start by adding a transaction or creating a note.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 p-md-5">
                <h5 className="fw-bold mb-3">Project Highlights</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-3">✅ Secure authentication with Laravel Sanctum</li>
                  <li className="mb-3">✅ Clean React component structure</li>
                  <li className="mb-3">✅ Dynamic UI actions with modal handling</li>
                  <li className="mb-3">✅ Reusable navigation and service layer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showm && (
        <ModalSpent2
          showm={showm}
          HideModal={() => setModal(false)}
        />
      )}
    </div>
  );
};