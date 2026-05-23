import { Link } from "react-router-dom";
import { useAuth } from "../ServiceContext/AuthContext";
import { useEffect, useState } from "react";
import { fetchAll } from "../Services/apiService";

export const Home = () => {
  const { user } = useAuth();

  const [spent, setSpent] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch financial data
  useEffect(() => {
    const getSpents = async () => {
      try {
        const res = await fetchAll("spent");

        setSpent(res.data.spentss || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getSpents();
  }, []);

  // safe array
  const safeData = Array.isArray(spent) ? spent : [];

  // total income
  const totalDeposits = safeData
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount), 0);

  // total expenses
  const totalWithdraw = safeData
    .filter((item) => item.type === "Spent")
    .reduce((total, item) => total + Number(item.amount), 0);

  // total investments
  const totalInvestment = safeData
    .filter((item) => item.type === "Investment")
    .reduce((total, item) => total + Number(item.amount), 0);

  // current balance
  const balance =
    totalDeposits - totalWithdraw;

  return (
    <div className="min-vh-100 bg-light">

      {/* HERO SECTION */}
      <section className="container py-5">

        <div className="row align-items-center g-5">

          <div className="col-lg-7">

            <span className="badge bg-dark px-3 py-2 mb-3">
              Full-Stack Developer • Laravel • React.js
            </span>

            <h1 className="display-4 fw-bold lh-sm">
              Building modern and scalable web applications
              with Laravel and React.
            </h1>

            <p className="lead text-muted mt-4">
              This project demonstrates authentication,
              reusable services, REST API integration,
              financial tracking, and responsive frontend
              architecture using modern technologies.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">

              <Link
                to="/dashboad"
                className="btn btn-primary btn-lg px-4 shadow-sm"
              >
                View Dashboard
              </Link>

              <Link
                to="/filter"
                className="btn btn-outline-dark btn-lg px-4"
              >
                Explore Features
              </Link>

              <a
                href="https://github.com/mmarcos14"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-lg px-4"
              >
                GitHub
              </a>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div className="col-lg-5">

            <div className="card border-0 shadow-lg rounded-4 p-4">

              <h4 className="fw-bold mb-4">
                Project Features
              </h4>

              <ul className="list-unstyled text-muted mb-0">

                <li className="mb-3">
                  Secure authentication with Laravel Sanctum
                </li>

                <li className="mb-3">
                  REST API architecture
                </li>

                <li className="mb-3">
                  Reusable React components
                </li>

                <li className="mb-3">
                  Financial dashboard calculations
                </li>

                <li className="mb-3">
                  Service layer and clean backend structure
                </li>

                <li>
                  Responsive UI with Bootstrap
                </li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* STATS SECTION */}
      <section className="container pb-5">

        <div className="row g-4 text-center">

          <div className="col-md-3">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h6 className="text-muted">
                Notes
              </h6>

              <h2 className="fw-bold text-primary">
                {user?.notes?.length || 0}
              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h6 className="text-muted">
                Income
              </h6>

              <h2 className="fw-bold text-success">
                ${totalDeposits.toFixed(2)}
              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h6 className="text-muted">
                Expenses
              </h6>

              <h2 className="fw-bold text-danger">
                ${totalWithdraw.toFixed(2)}
              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h6 className="text-muted">
                Investments
              </h6>

              <h2 className="fw-bold text-warning">
                ${totalInvestment.toFixed(2)}
              </h2>

            </div>

          </div>

          {/* balance */}
          <div className="col-12">

            <div className="card border-0 shadow-sm rounded-4 p-4">

              <h5 className="text-muted">
                Current Balance
              </h5>

              <h1 className="fw-bold">
                ${balance.toFixed(2)}
              </h1>

            </div>

          </div>

        </div>

      </section>

      {/* SKILLS SECTION */}
      <section className="container pb-5">

        <h2 className="text-center fw-bold mb-5">
          What This Project Demonstrates
        </h2>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h5 className="fw-bold mb-3">
                Authentication
              </h5>

              <p className="text-muted mb-0">
                Secure authentication system using
                Laravel Sanctum and protected routes.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h5 className="fw-bold mb-3">
                Backend Architecture
              </h5>

              <p className="text-muted mb-0">
                Clean code structure with services,
                reusable logic, and Eloquent relationships.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

              <h5 className="fw-bold mb-3">
                Frontend Development
              </h5>

              <p className="text-muted mb-0">
                Dynamic React components with responsive UI
                and modern user experience.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ABOUT SECTION */}
      <section className="container pb-5">

        <div className="card border-0 shadow-lg rounded-4 p-5 text-center">

          <h2 className="fw-bold mb-4">
            About Me
          </h2>

          <p
            className="text-muted mx-auto mb-0"
            style={{ maxWidth: "800px" }}
          >
            I am a Full-Stack Web Developer specialized
            in Laravel and React.js. I enjoy building
            scalable web applications with clean architecture,
            reusable code, REST APIs, and responsive user
            interfaces. I continuously improve my skills
            by working on real-world projects.
          </p>

        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="container pb-5 text-center">

        <h2 className="fw-bold mb-3">
          Contact
        </h2>

        <p className="text-muted mb-4">
          Open to internship, freelance,
          and junior developer opportunities.
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3">

          <a
            href="mailto:your@email.com"
            className="btn btn-primary px-4"
          >
            Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/ambroise-zounmenou-87843b30b/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark px-4"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/mmarcos14"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark px-4"
          >
            GitHub
          </a>

        </div>

      </section>

    </div>
  );
};