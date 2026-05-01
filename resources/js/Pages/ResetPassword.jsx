import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";

export const ResetPassword = () => {
    // état du formulaire reset password
    const [DataUser, setData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });

    // contexte auth (API + erreurs globales)
    const { operations, errors: authErrors, setErrors: setAuthErrors } = useAuth();

    // erreurs locales spécifiques à ce composant
    const [localErrors, setLocalErrors] = useState({});

    const navigate = useNavigate();

    // gestion des inputs
    const handleInput = (e) => {
        setData({
            ...DataUser,
            [e.target.name]: e.target.value,
        });
    };

    // submit reset password
    const save = async (e) => {
        e.preventDefault();

        // reset erreurs avant nouvelle tentative
        setLocalErrors({});
        setAuthErrors({});

        try {
            // appel API reset password
            const res = await operations("/user/reset", DataUser);

            // si succès → redirection login
            if (res) {
                alert("Password reset successful");
                navigate("/login");
            }

        } catch (error) {
            console.error(error);

            // erreurs validation Laravel
            if (error?.response?.status === 422) {
                setLocalErrors(error.response.data.errors || {});
            } else {
                // erreur générale
                setLocalErrors({
                    general: ["Something went wrong"],
                });
            }
        }
    };

    // fusion erreurs globales + locales
    const errors = { ...authErrors, ...localErrors };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-5 shadow-lg bg-white p-4 rounded">

                    {/* ERREUR GLOBALE */}
                    {errors?.general && (
                        <div className="text-danger mb-2">
                            {errors.general[0] || errors.general}
                        </div>
                    )}

                    <Form onSubmit={save}>

                        {/* EMAIL */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                name="email"
                                value={DataUser.email}
                                onChange={handleInput}
                            />

                            {/* erreur email */}
                            {errors?.email?.[0] && (
                                <small className="text-danger">
                                    {errors.email[0]}
                                </small>
                            )}
                        </Form.Group>

                        {/* PASSWORD */}
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>

                            <Form.Control
                                type="password"
                                name="password"
                                value={DataUser.password}
                                onChange={handleInput}
                            />

                            {/* erreur password */}
                            {errors?.password?.[0] && (
                                <small className="text-danger">
                                    {errors.password[0]}
                                </small>
                            )}
                        </Form.Group>

                        {/* CONFIRM PASSWORD */}
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>

                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                value={DataUser.password_confirmation}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        {/* SUBMIT */}
                        <Button type="submit" className="w-100">
                            Save
                        </Button>

                    </Form>

                </div>

            </div>

        </div>
    );
};