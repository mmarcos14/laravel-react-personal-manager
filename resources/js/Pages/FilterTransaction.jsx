import { useEffect, useMemo, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Filters } from "../Services/apiService";

export const FilterTransaction = () => {
  const [datafilter, setData] = useState({
    date1: "",
    date2: "",
    type: "",
  });

  const [transactionData, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const safeData = Array.isArray(transactionData) ? transactionData : [];

  const typeOptions = [
    { value: "", label: "All types" },
    { value: "Income", label: "Income" },
    { value: "Spent", label: "Spent" },
    { value: "Saving", label: "Saving" },
    { value: "Investment", label: "Investment" },
    { value: "Transport", label: "Transport" },
    { value: "Food", label: "Food" },
  ];

  const total = useMemo(() => {
    return safeData.reduce((t, n) => t + Number(n.amount || 0), 0);
  }, [safeData]);

  const fetchData = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const payload = {
        ...datafilter,
        type: datafilter.type || "",
      };

      const response = await Filters("filter", payload);
      setTransaction(response?.data?.datas || []);
    } catch (error) {
      console.error("Error:", error);
      setTransaction([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasFilter = datafilter.date1 || datafilter.date2 || datafilter.type;
    if (hasFilter) fetchData();
  }, [datafilter]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                  <span className="badge bg-dark mb-2 px-3 py-2">
                    Transaction Filter
                  </span>
                  <h3 className="fw-bold mb-1">Filter your data</h3>
                  <p className="text-muted mb-0">
                    Search transactions by date range and transaction type.
                  </p>
                </div>

                <div className="text-md-end">
                  <div className="text-muted small">Filtered total</div>
                  <h4 className="mb-0 text-success fw-bold">
                    ${total.toFixed(2)}
                  </h4>
                </div>
              </div>

              <Form>
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <Form.Label className="fw-semibold">Start date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date1"
                      value={datafilter.date1}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-4">
                    <Form.Label className="fw-semibold">End date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date2"
                      value={datafilter.date2}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-4">
                    <Form.Label className="fw-semibold">Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={datafilter.type}
                      onChange={handleInput}
                    >
                      {typeOptions.map((item) => (
                        <option key={item.label} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="col-12 d-flex gap-2 justify-content-end mt-2">
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        setData({ date1: "", date2: "", type: "" })
                      }
                    >
                      Reset
                    </Button>

                    <Button variant="primary" onClick={fetchData} disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Loading...
                        </>
                      ) : (
                        "Apply filters"
                      )}
                    </Button>
                  </div>
                </div>
              </Form>

              <hr className="my-4" />

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Destination</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <Spinner animation="border" size="sm" className="me-2" />
                          Loading transactions...
                        </td>
                      </tr>
                    ) : safeData.length > 0 ? (
                      safeData.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-muted">{index + 1}</td>
                          <td>
                            <span
                              className={`badge ${
                                item.type === "Income"
                                  ? "bg-success"
                                  : item.type === "Saving"
                                  ? "bg-primary"
                                  : item.type === "Investment"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              {item.type}
                            </span>
                          </td>
                          <td className="fw-bold">
                            ${Number(item.amount || 0).toFixed(2)}
                          </td>
                          <td>{item.destination || "-"}</td>
                          <td>{formatDate(item.operation_date)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-5">
                          {searched
                            ? "No transactions found for these filters."
                            : "Choose filters and click Apply filters."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <div className="px-3 py-2 bg-light rounded-3 border">
                  <span className="text-muted me-2">Total:</span>
                  <span className="fw-bold text-success">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};