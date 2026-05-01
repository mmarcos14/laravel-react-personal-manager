import { Link } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";
import { useEffect, useState } from "react";
import { fetchAll } from "../Services/apiService";

export const Ambroise = () => {
  // utilisateur connecté depuis auth context
  const { user } = useAuth();

  // état local des transactions (spent)
  const [spent, setSpent] = useState([]);

  // récupération des transactions depuis API
  const getSpents = async () => {
    try {
      const response = await fetchAll("spent");

      // stockage des données (attention "spentss" vient du backend)
      setSpent(response.data.spentss);

    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  // chargement au montage du composant
  useEffect(() => {
    getSpents();
  }, []);

  // sécurisation des données
  const safeData = Array.isArray(spent) ? spent : [];

  // calcul total income
  const totalDeposits = safeData
    .filter(i => i.type === "Income")
    .reduce((t, i) => t + Number(i.amount), 0);

  // calcul total expenses
  const totalWithdraw = safeData
    .filter(i => i.type === "Spent")
    .reduce((t, i) => t + Number(i.amount), 0);

  // calcul balance
  const balance = totalDeposits - totalWithdraw;

  return (
    <div className="container">

      {/* TITLE */}
      <h2 className="fw-bold mb-4">Dashboard</h2>

      {/* QUICK ACTIONS */}
      <div className="row g-3 mb-4 py-5 bg-info">

        <div className="col-md-3">
          <Link to="/note" className="text-decoration-none">
            <div className="card p-3 shadow-sm rounded-4 text-center">
              📝 Notes
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/spent" className="text-decoration-none">
            <div className="card p-3 shadow-sm rounded-4 text-center">
              💰 Transactions
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/filter" className="text-decoration-none">
            <div className="card p-3 shadow-sm rounded-4 text-center">
              🔎 Filter
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/profile" className="text-decoration-none">
            <div className="card p-3 shadow-sm rounded-4 text-center">
              Profile
            </div>
          </Link>
        </div>

      </div>

      {/* STATS SECTION */}
      <div className="row g-4">

        {/* NOTES */}
        <div className="col-md-3">
          <div className="card p-4 shadow-sm rounded-4">
            <div className="text-muted small">Notes</div>
            <div className="fs-4 fw-bold text-primary">
              {user?.notes?.length || 0}
            </div>
          </div>
        </div>

        {/* INCOME */}
        <div className="col-md-3">
          <div className="card p-4 shadow-sm rounded-4">
            <div className="text-muted small">Income</div>
            <div className="fs-4 fw-bold text-success">
              +{totalDeposits.toFixed(2)}
            </div>
          </div>
        </div>

        {/* EXPENSES */}
        <div className="col-md-3">
          <div className="card p-4 shadow-sm rounded-4">
            <div className="text-muted small">Expenses</div>
            <div className="fs-4 fw-bold text-danger">
              -{totalWithdraw.toFixed(2)}
            </div>
          </div>
        </div>

        {/* BALANCE */}
        <div className="col-md-3">
          <div className="card p-4 shadow-sm rounded-4">
            <div className="text-muted small">Balance</div>
            <div className="fs-4 fw-bold">
              {balance.toFixed(2)}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};