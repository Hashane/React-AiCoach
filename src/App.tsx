import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            🧠 AI Coach
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1 pt-3 overflow-auto">
        <Chat />
      </div>
    </div>
  );
}

export default App;
