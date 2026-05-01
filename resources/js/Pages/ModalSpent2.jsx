import { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { createOne, updateOne } from "../Services/apiService";
import { toast } from "react-toastify";

// Modal pour créer ou modifier une transaction (version améliorée)
export const ModalSpent2 = ({
  showm, // contrôle affichage modal
  HideModal, // fonction fermeture modal
  CurrentSpent, // transaction sélectionnée (édition)
  listFresh, // refresh de la liste après action
}) => {
  // état initial du formulaire
  const initialState = {
    id: "",
    type: "",
    transaction_method: "",
    amount: "",
    destination: "",
    operation_date: new Date().toISOString().slice(0, 10),
  };

  const [dataSpent, setDataSpent] = useState(initialState);
  const [errors, setErrors] = useState({}); // gestion erreurs backend

  // options de type de transaction
  const typeOptions = ["Income", "Spent", "Saving", "Investment", "Transport", "Food"];

  // options de méthode de paiement
  const methodOptions = [
    "ZELLE",
    "CASHAPP",
    "MOBILE TRANSFER",
    "BANK TRANSFER",
  ];

  // synchronisation si on édite une transaction
  useEffect(() => {
    if (CurrentSpent?.id) {
      setDataSpent({
        id: CurrentSpent.id,
        type: CurrentSpent.type || "",
        transaction_method: CurrentSpent.transaction_method || "",
        amount: CurrentSpent.amount || "",
        destination: CurrentSpent.destination || "",
        operation_date:
          CurrentSpent.operation_date ||
          new Date().toISOString().slice(0, 10),
      });
    } else {
      // reset si création
      setDataSpent(initialState);
    }
  }, [CurrentSpent]);

  // gestion des inputs
  const handleInput = (e) => {
    setDataSpent({
      ...dataSpent,
      [e.target.name]: e.target.value,
    });
  };

  // soumission formulaire (create / update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (CurrentSpent?.id) {
        // update transaction existante
        await updateOne("spent", {
          ...dataSpent,
          id: CurrentSpent.id,
        });

        toast.success("Transaction updated successfully");
      } else {
        // création nouvelle transaction
        await createOne("spent", dataSpent);
        toast.success("Transaction added successfully");
      }

      // reset erreurs et formulaire
      setErrors({});
      setDataSpent(initialState);

      // refresh liste parent
      listFresh?.();

      // fermeture modal
      HideModal?.();

    } catch (error) {
      // gestion erreurs validation Laravel
      if (error?.response?.status === 422) {
        setErrors(error.response.data?.errors || {});
      } else {
        console.error("FULL ERROR:", error?.response || error);
      }
    }
  };

  return (
    <Modal
      show={showm}
      onHide={HideModal}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* Header du modal */}
      <Modal.Header
        closeButton
        className="border-0 text-white"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="d-flex align-items-center gap-3">

          {/* icône ronde */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center bg-white bg-opacity-25"
            style={{ width: 52, height: 52 }}
          >
            <i className="fas fa-wallet fs-4 text-white"></i>
          </div>

          {/* titre dynamique */}
          <div>
            <h5 className="mb-0 fw-bold">
              {CurrentSpent?.id
                ? "Update Transaction"
                : "Add Transaction"}
            </h5>
          </div>

        </div>
      </Modal.Header>

      {/* Body du modal */}
      <Modal.Body className="p-4 p-md-5" style={{ background: "#f8faff" }}>
        <Form onSubmit={handleSubmit}>

          <Row className="g-3">

            {/* TYPE */}
            <Col md={6}>
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={dataSpent.type}
                onChange={handleInput}
                required
              >
                <option value="">Choose type...</option>
                {typeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* METHOD */}
            <Col md={6}>
              <Form.Label>Method</Form.Label>
              <Form.Select
                name="transaction_method"
                value={dataSpent.transaction_method}
                onChange={handleInput}
                required
              >
                <option value="">Choose method...</option>
                {methodOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* AMOUNT */}
            <Col md={6}>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={dataSpent.amount}
                onChange={handleInput}
                required
              />
            </Col>

            {/* DESTINATION */}
            <Col md={6}>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={dataSpent.destination}
                onChange={handleInput}
              />
            </Col>

            {/* DATE */}
            <Col md={12}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="operation_date"
                value={dataSpent.operation_date}
                onChange={handleInput}
                required
              />
            </Col>

          </Row>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={HideModal}>
              Cancel
            </Button>

            <Button type="submit">
              {CurrentSpent?.id ? "Update" : "Save"}
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};