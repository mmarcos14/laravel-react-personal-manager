import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "react-bootstrap";
import { createOne, updateOne } from "../Services/apiService";
import { toast } from "react-toastify";

export const SupportModal=({
  showm,
  HideModal,
  CurrentSpent,
  listFresh,
}) => {

  //  SAFE MOUNT CONTROL
  const isMounted = useRef(false);

  const initialState = {
    id: "",
    type: "",
    transaction_method: "",
    amount: "",
    destination: "",
    operation_date: new Date().toISOString().slice(0, 10),
  };

  const [dataSpent, setDataSpent] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const typeOptions = ["Income", "Spent", "Saving", "Investment", "Transport", "Food","Familly Support"];
  const methodOptions = ["ZELLE", "CASHAPP", "MOBILE TRANSFER", "BANK TRANSFER",'Taptap Send'];

  //  FIX MOUNT STATE
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (CurrentSpent) {
      setDataSpent({
        id: CurrentSpent?.id || "",
        type: CurrentSpent?.type || "",
        transaction_method: CurrentSpent?.transaction_method || "",
        amount: CurrentSpent?.amount || "",
        destination: CurrentSpent?.destination || "",
        operation_date:
          CurrentSpent?.operation_date ||
          new Date().toISOString().slice(0, 10),
      });
    } else {
      setDataSpent(initialState);
    }
  }, [CurrentSpent, showm]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDataSpent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setDataSpent(initialState);
  };

  const handleClose = () => {
    if (!isMounted.current) return;

    HideModal?.();
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isMounted.current) return;

    setSubmitting(true);

    try {
      const payload = {
        ...dataSpent,
        amount: Number(dataSpent.amount),
      };

      if (CurrentSpent?.id) {
        await updateOne("spent", payload);
        toast.success("Transaction updated successfully");
      } else {
        await createOne("spent", payload);
        toast.success("Transaction added successfully");
      }

      //  SAFE AFTER API
      if (isMounted.current) {
        listFresh?.();
        handleClose();
      }

    } catch (error) {
      console.error(error);

      if (isMounted.current) {
        toast.error("Something went wrong");
      }

    } finally {
      if (isMounted.current) {
        setSubmitting(false);
      }
    }
  };

  return (
    <Modal
      show={showm}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={!submitting}
    >
      <ModalHeader
        className="bg-warning text-primary fw-bold"
        closeButton
        closeVariant="white"
      >
        <h5 className="mb-0">💸 Transaction</h5>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control shadow-sm"
              value={dataSpent.amount}
              onChange={handleInput}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              type="text"
              name="destination"
              className="form-control shadow-sm"
              value={dataSpent.destination}
              onChange={handleInput}
              required
            />
          </div>

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

          <ModalFooter className="border-0 px-0">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              variant="success"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};