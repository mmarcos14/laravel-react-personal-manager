import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "react-bootstrap";
import { createOne, updateOne } from "../Services/apiService";
import { toast } from "react-toastify";

// Composant modal pour créer ou modifier une transaction
export const ModalSpent = ({
  showm, // contrôle affichage modal
  HideModal, // fonction pour fermer modal
  CurrentSpent, // transaction en cours d’édition
  listFresh, // refresh de la liste après action
}) => {
  // État du formulaire
  const [dataSpent, setDataSpent] = useState({
    id: "",
    type: "",
    transaction_method: "",
    amount: 0,
    destination: "",
    operation_date: new Date().toISOString().slice(0, 10), // date par défaut
  });

  // Options pour le type de transaction
  const typeOptions = ["Income", "Spent", "Saving", "Investment", "Transport", "Food"];

  // Options de méthodes de paiement
  const methodOptions = [
    "ZELLE",
    "CASHAPP",
    "MOBILE TRANSFER",
    "BANK TRANSFER",
  ];

  // Synchronisation des données quand on édite une transaction
  useEffect(() => {
    if (CurrentSpent) {
      setDataSpent({
        id: CurrentSpent?.id || "",
        type: CurrentSpent?.type || "",
        transaction_method: CurrentSpent?.transaction_method || "",
        amount: CurrentSpent?.amount || 0,
        destination: CurrentSpent?.destination || "",
        operation_date:
          CurrentSpent?.operation_date ||
          new Date().toISOString().slice(0, 10),
      });
    } else {
      // reset si création
      setDataSpent({
        id: "",
        type: "",
        transaction_method: "",
        amount: 0,
        destination: "",
        operation_date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [CurrentSpent]);

  // Gestion des inputs du formulaire
  const handleInput = (e) => {
    setDataSpent({
      ...dataSpent,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire (create ou update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mode update si un ID existe
      if (CurrentSpent?.id) {
        await updateOne("spent", dataSpent);
        toast.success("Transaction updated successfully");
      } else {
        // Mode création
        await createOne("spent", dataSpent);
        toast.success("Transaction added successfully");
      }

      // refresh liste après action
      listFresh?.();

      // fermeture modal
      HideModal?.();

      // reset formulaire
      setDataSpent({
        id: "",
        type: "",
        transaction_method: "",
        amount: 0,
        destination: "",
        operation_date: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal show={showm} centered>
      
      {/* Header du modal */}
      <ModalHeader className="bg-primary text-white">
        <h5 className="mb-0">💸 Transaction</h5>
        <button className="btn-close" onClick={HideModal}></button>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit}>

          {/* TYPE */}
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              className="form-select shadow-sm"
              name="type"
              value={dataSpent.type}
              onChange={handleInput}
              required
            >
              <option value="">Select type</option>
              {typeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* MÉTHODE DE TRANSACTION */}
          <div className="mb-3">
            <label className="form-label">Transaction Method</label>
            <select
              className="form-select shadow-sm"
              name="transaction_method"
              value={dataSpent.transaction_method}
              onChange={handleInput}
              required
            >
              <option value="">Select method</option>
              {methodOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* MONTANT */}
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control shadow-sm"
              value={dataSpent.amount}
              onChange={handleInput}
              placeholder="Ex: 500"
              required
            />
          </div>

          {/* DESTINATION */}
          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              type="text"
              name="destination"
              className="form-control shadow-sm"
              value={dataSpent.destination}
              onChange={handleInput}
              placeholder="Ex: Amazon"
              required
            />
          </div>

          {/* DATE */}
          <div className="mb-3">
            <label className="form-label">Operation Date</label>
            <input
              type="date"
              name="operation_date"
              className="form-control shadow-sm"
              value={dataSpent.operation_date}
              onChange={handleInput}
              required
            />
          </div>

          {/* FOOTER ACTIONS */}
          <ModalFooter className="border-0 px-0">
            <Button variant="secondary" onClick={HideModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </ModalFooter>

        </form>
      </ModalBody>
    </Modal>
  );
};