import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../ServiceContext/AuthContext";

export const UpdateModalUser = ({
  show,
  HideModal,
  CurrentUser,
  refreshlist,
}) => {

  // état du formulaire utilisateur
  const [DataUser, setData] = useState({
    id: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // erreurs backend
  const [errors, setErrors] = useState({});

  const { operations } = useAuth();

  // synchronisation du user sélectionné avec le formulaire
  useEffect(() => {
    if (CurrentUser) {
      setData({
        id: CurrentUser.id || "",
        email: CurrentUser.email || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [CurrentUser]);

  // gestion input
  const handleInput = (e) => {
    setData({
      ...DataUser,
      [e.target.name]: e.target.value,
    });
  };

  // submit update
  const save = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await operations("/user/reset", {
        ...DataUser,
        id: CurrentUser.id,
      });

      refreshlist?.();
      HideModal?.();

    } catch (error) {
      setErrors(error?.response?.data?.errors || {});
    }
  };

  return (
    <Modal show={show} onHide={HideModal} centered>

      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>

      <Modal.Body>

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

            <small className="text-danger">
              {errors?.email?.[0]}
            </small>
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

            <small className="text-danger">
              {errors?.password?.[0]}
            </small>
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

          {/* ACTIONS */}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={HideModal}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>

        </Form>

      </Modal.Body>

    </Modal>
  );
};