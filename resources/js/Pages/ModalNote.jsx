import { useEffect, useState } from "react";
import { Form, Modal, ModalBody } from "react-bootstrap";
import { createOne, updateOne } from "../Services/apiService";
import { toast } from "react-toastify";

export const ModalNote = ({
  showm,
  HideModal,
  CurrentNote,
  Listrefresh,
}) => {
  const [DataNote, setNote] = useState({
    id: "",
    title: "",
    messages: "",
    date_event: new Date().toISOString().slice(0, 10),
  });

  const handleInput = (e) => {
    setNote({ ...DataNote, [e.target.name]: e.target.value });
  };

  // 🔥 FIX IMPORTANT STATE SYNC
  useEffect(() => {
    if (CurrentNote) {
      setNote({
        id: CurrentNote?.id || "",
        title: CurrentNote?.title || "",
        messages: CurrentNote?.messages || "",
        date_event:
          CurrentNote?.date_event ||
          new Date().toISOString().slice(0, 10),
      });
    }
  }, [CurrentNote]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (CurrentNote?.id) {
        await updateOne("notes", DataNote);

        toast.success("Note updated successfully");
      } else {
        await createOne("notes", DataNote);

        toast.success("Note created successfully");
      }

      Listrefresh?.();
      HideModal?.();

      // reset
      setNote({
        id: "",
        title: "",
        messages: "",
        date_event: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      show={showm}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
      onHide={HideModal}
    >
      <Modal.Header
        closeButton
        style={{
          background:
            "linear-gradient(135deg, #ea6687af 0%, #764ba2 100%)",
        }}
      >
        ADD NOTE
      </Modal.Header>

      <ModalBody>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              placeholder="Ex: meeting for training"
              onChange={handleInput}
              value={DataNote.title}
              name="title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write here..."
              name="messages"
              onChange={handleInput}
              value={DataNote.messages}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold">Date event</Form.Label>
            <Form.Control
              type="date"
              onChange={handleInput}
              value={DataNote.date_event}
              name="date_event"
            />
          </Form.Group>

          <div className="form-group float-end mt-2">
            <button className="btn btn-sm btn-primary">
              {CurrentNote?.id ? "Update Note" : "Add Note"}
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};