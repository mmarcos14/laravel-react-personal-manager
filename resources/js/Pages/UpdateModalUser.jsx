import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";

import { useAuth } from "../ServiceContext/AuthContext";
import { updateOne } from "../Services/apiService";

export const UpdateModalUser = ({
  show,
  HideModal,
  CurrentUser,
  refreshlist,
}) => {

  // USER DATA
  const [DataUser, setData] = useState({
    id: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  useEffect(()=>{
    setData({...DataUser,id:CurrentUser?.id})
    
  },[CurrentUser])

  // BACKEND ERRORS
  const [errors, setErrors] = useState({});

  const { operations } = useAuth();

  // ROLE OPTIONS
  const roles = {
    1: "User",
    2: "Level 2",
    3: "Admin",
    4: "Super Admin",
    5: "Manager",
    6: "Moderator",
  };

  const RightOption = [1, 2, 3, 4, 5, 6];

  // HANDLE INPUT
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const update=async(e)=>{
    e.preventDefault();
    const response=updateOne('Roles',DataUser);
    window.location.reload();
  }

  return (
    <Modal show={show} onHide={HideModal} centered>

      {/* HEADER */}
      <ModalHeader className="bg-dark text-white">
        <h5 className="mb-0">Update User Role</h5>

        <button
          className="btn-close btn-close-white"
          onClick={HideModal}
        />
      </ModalHeader>

      {/* BODY */}
      <ModalBody>

        <Form onSubmit={update}>

          {/* SELECT ROLE */}
          <Form.Group className="mb-3">

            <Form.Label className="fw-semibold">
              Select Role
            </Form.Label>

            <Form.Select
              name="role"
              value={DataUser.role}
              onChange={handleInput}
            >

              <option value="">
                Choose role
              </option>

              {RightOption.map((p) => (
                <option value={p} key={p}>
                  {roles[p]}
                </option>
              ))}

            </Form.Select>

          </Form.Group>

          {/* BUTTON */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>

        </Form>

      </ModalBody>
    </Modal>
  );
};