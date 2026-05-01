import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";

export const Register = () => {
    // auth global (user connecté + fonction register + erreurs)
    const { user, operations, errors, setErrors } = useAuth();

    const navigate = useNavigate();

    // état du formulaire
    const [DataUser, setDataUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // reset erreurs au chargement
    useEffect(() => {
        setErrors({});
    }, []);

    // gestion inputs
    const handleInput = (e) => {
        setDataUser({
            ...DataUser,
            [e.target.name]: e.target.value
        });
    };

    // submit register
    const submited = async (e) => {
        e.preventDefault();

        const res = await operations("/register", DataUser);

        // si succès → redirection home
        if (res) navigate("/");
    };

    // si déjà connecté → redirection
    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow-lg border-0">

                        {/* HEADER */}
                        <div className="card-header bg-success text-white text-center fs-4">
                            📝 Register
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={submited}>

                                {/* NAME */}
                                <div className="mb-3">
                                    <label className="form-label">Username</label>

                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        value={DataUser.name}
                                        onChange={handleInput}
                                    />

                                    {/* erreur backend */}
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name[0]}
                                        </div>
                                    )}
                                </div>

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

                                {/* CONFIRM PASSWORD */}
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>

                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                                        value={DataUser.password_confirmation}
                                        onChange={handleInput}
                                    />

                                    {errors.password_confirmation && (
                                        <div className="invalid-feedback">
                                            {errors.password_confirmation[0]}
                                        </div>
                                    )}
                                </div>

                                {/* BUTTON */}
                                <button className="btn btn-success w-100 mt-2">
                                    Register
                                </button>

                                {/* LINK LOGIN */}
                                <div className="text-center mt-3">
                                    <span>Already have an account? </span>
                                    <Link to="/login">Login</Link>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};