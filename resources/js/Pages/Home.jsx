import { Link } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";
import { useEffect, useState } from "react";
import { fetchAll } from "../Services/apiService";

export const Home = () => {
  const { user } = useAuth();
  const [spent, setSpent] = useState([]);

  useEffect(() => {
    const getSpents = async () => {
      try {
        const res = await fetchAll("spent");
        setSpent(res.data.spentss || []);
      } catch (e) {
        console.error(e);
      }
    };
    getSpents();
  }, []);

  const safeData = Array.isArray(spent) ? spent : [];

  const totalDeposits = safeData
    .filter((i) => i.type === "Income")
    .reduce((t, i) => t + Number(i.amount), 0);

  const totalWithdraw = safeData
    .filter((i) => i.type === "Spent")
    .reduce((t, i) => t + Number(i.amount), 0);

  const totalInvestment = safeData
    .filter((i) => i.type === "Investment")
    .reduce((t, i) => t + Number(i.amount), 0);

  const balance = totalDeposits - totalWithdraw - totalInvestment;

  return (
    <div className="min-vh-100 bg-light">
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge bg-dark mb-3 px-3 py-2">
              Full-Stack Developer • Laravel • React
            </span>

            <h1 className="display-5 fw-bold">
              I build secure, scalable, and recruiter-ready web applications.
            </h1>

            <p className="lead text-muted mt-3">
              This project demonstrates authentication, API integration, data
              aggregation, and real-time dashboard updates using Laravel and React.
            </p>

            <div className="d-flex gap-3 flex-wrap mt-4">
              <Link to="/dashboad" className="btn btn-primary px-4">
                View Live Demo
              </Link>
              <Link to="/filter" className="btn btn-outline-dark px-4">
                Explore Features
              </Link>
              <a
                href="https://github.com/mmarcos14"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark px-4"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3">Project Snapshot</h5>
              <ul className="list-unstyled mb-0 text-muted">
                <li className="mb-2">• Secure login with Laravel Sanctum</li>
                <li className="mb-2">• REST API with reusable service layer</li>
                <li className="mb-2">• Dynamic financial calculations</li>
                <li className="mb-2">• Responsive UI built with React</li>
                <li className="mb-2">• Clean architecture and maintainable code</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <h3 className="text-center fw-bold mb-4">Live Data</h3>
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="card p-4 shadow-sm rounded-4">
              <h6 className="text-muted">Notes</h6>
              <h3 className="text-primary">{user?.notes?.length || 0}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm rounded-4">
              <h6 className="text-muted">Income</h6>
              <h3 className="text-success">+{totalDeposits.toFixed(2)}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm rounded-4">
              <h6 className="text-muted">Expenses</h6>
              <h3 className="text-danger">-{totalWithdraw.toFixed(2)}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm rounded-4">
              <h6 className="text-muted">Investment</h6>
              <h3 className="text-warning">{totalInvestment.toFixed(2)}</h3>
            </div>
          </div>

          <div className="col-12">
            <div className="card p-4 shadow-sm rounded-4 mt-3">
              <h6 className="text-muted">Balance</h6>
              <h3 className="fw-bold">{balance.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <h3 className="text-center fw-bold mb-4">What This Project Shows</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm rounded-4 h-100">
              <h5>Authentication</h5>
              <p className="text-muted mb-0">
                Secure user access with Laravel Sanctum and protected routes.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm rounded-4 h-100">
              <h5>Data Processing</h5>
              <p className="text-muted mb-0">
                Aggregation, filtering, and balance calculation in real time.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm rounded-4 h-100">
              <h5>API Integration</h5>
              <p className="text-muted mb-0">
                Reusable service layer with clean frontend-backend communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="card p-4 p-md-5 shadow-sm rounded-4 text-center">
          <h3 className="fw-bold mb-3">About Me</h3>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: "700px" }}>
            I am a full-stack developer focused on building modern web applications
            with Laravel and React. I care about clean UI, strong architecture, and
            solving real problems with maintainable code.
          </p>
        </div>
      </section>

      <section className="container pb-5 text-center">
        <h4 className="fw-bold">Contact</h4>
        <p className="text-muted">
          Open to internship, freelance, and full-time opportunities.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="mailto:your@email.com" className="btn btn-primary">
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/ambroise-zounmenou-87843b30b/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};