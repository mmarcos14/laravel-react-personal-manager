import { useEffect, useState } from "react";
import { useAuth } from "../ServiceContext/AuthContext";
import { updateOne } from "../Services/apiService";
import { toast } from "react-toastify";

export const Profile = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const saveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateOne("user", { name });
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR")
    : "N/A";

  const noteCount = user?.notes_count ?? user?.notes?.length ?? 0;
  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div
                className="bg-primary text-white p-4 p-md-5"
                style={{
                  background: "linear-gradient(135deg, #0d6efd, #4c8dff)",
                }}
              >
                <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
                  <div
                    className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold shadow"
                    style={{ width: 90, height: 90, fontSize: 34 }}
                  >
                    {initial}
                  </div>

                  <div className="flex-grow-1">
                    <h3 className="fw-bold mb-1">{user?.name || "User Profile"}</h3>
                    <p className="mb-1 opacity-75">{user?.email || "N/A"}</p>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      <span className="badge bg-light text-primary px-3 py-2">
                        {noteCount} notes
                      </span>
                      <span className="badge bg-light text-primary px-3 py-2">
                        Member since {joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={name}
                      disabled={!editing}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={user?.email || ""}
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">
                      Member since
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={joinDate}
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">
                      Notes
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={noteCount}
                      disabled
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-5">
                  <div className="d-flex gap-2">
                    {!editing ? (
                      <button
                        className="btn btn-primary px-4"
                        onClick={() => setEditing(true)}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        className="btn btn-success px-4"
                        onClick={saveProfile}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    )}

                    {editing && (
                      <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => {
                          setEditing(false);
                          setName(user?.name || "");
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <button
                    className="btn btn-outline-danger px-4"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};