import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";

export const Login = () => {
  const { operations, errors ,setErrors} = useAuth();
  const navigate = useNavigate();

  const [DataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setDataUser({ ...DataUser, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    const res = await operations("/login", DataUser);
    if (res) navigate("/"); // redirection après login
  };
 useEffect(()=>{
    setErrors({})
 },[])
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
            {errors.general && errors.general.map((msg, i) => (
           <div key={i} className="alert alert-danger">{msg}</div>
            ))}
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center fs-4">
              🔐 Login
            </div>

            <div className="card-body p-4">

           
              <form onSubmit={save}>
                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={DataUser.email}
                    onChange={handleInput}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email[0]}
                    </div>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    value={DataUser.password}
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password[0]}
                    </div>
                  )}
                </div>

                {/* BUTTON */}
                <button className="btn btn-primary w-100 mt-2">
                  Login
                </button>

                {/* LINK */}
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <Link to="/register">Register</Link>  <Link className="mx-3" to="/resset_password">Forgot password ???</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};